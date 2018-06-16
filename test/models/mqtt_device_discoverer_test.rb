# frozen_string_literal: true

require 'test_helper'

class MqttDeviceDiscovererTest < ActiveSupport::TestCase
  setup do
    @farm = farms(:bct)
    @discoverer = MqttDeviceDiscoverer.new(@farm)
  end

  test "it finds the three devices in the fixtures" do
    assert_equal Devices::MinewS1, @discoverer.discoveries[:discoveries]["sensors/ac:23:3f:a0:3b:16"][:device_class]
    assert_equal Devices::EspurnaSonoffTh, @discoverer.discoveries[:discoveries]["sensors/BCDDC2E81300"][:device_class]
  end

  test "it creates discovery logs for all devices on the mqtt bus" do
    assert_difference("DeviceDiscoveryLog.count", 3) do
      @discoverer.discover_and_save!
    end
  end

  test "it doesn't create new discovery logs for devices that have already been discovered" do
    @discoverer.discover_and_save!

    # A second run shouldn't create more logs
    assert_difference("DeviceDiscoveryLog.count", 0) do
      @discoverer.discover_and_save!
    end

    MqttTopicState.where(farm_id: farms(:bct).id, topic: "sensors/BCDDC2E81300/datetime").update_all(contents: "2018-06-05 23:59:59")

    # A run after an update for a device shouldn't create more logs
    assert_difference("DeviceDiscoveryLog.count", 0) do
      @discoverer.discover_and_save!
    end
  end

  test "discovery logs get updated with the timestamp of the data if they already exist" do
    @discoverer.discover_and_save!
    @log = DeviceDiscoveryLog.where(mqtt_key: "sensors/BCDDC2E81300").first
    @last_seen = @log.last_seen

    # Advance system time and check that the device hasn't been seen any later, because no new data arrived
    Timecop.freeze(Date.today + 30) do
      @discoverer.discover_and_save!
      @log.reload
      assert_equal @last_seen, @log.last_seen

      # Simulate another push to the message bus with an update at a new time
      state = MqttTopicState.find_by(farm_id: farms(:bct).id, topic: "sensors/BCDDC2E81300/temperature")
      state.contents = "25"
      state.save!
      @discoverer.discover_and_save!
      @log.reload
      assert_operator @last_seen, :<, @log.last_seen
    end
  end
end
