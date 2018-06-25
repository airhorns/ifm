# frozen_string_literal: true

require 'test_helper'

class DeviceDiscovererDevicesTest < ActiveSupport::TestCase
  setup do
    @farm = farms(:bct)
  end

  test "it discovers Minew S1s" do
    @discovery = discovery(
      "device" => "Minew S1",
      "datetime" => "1529938018855",
      "transmission_power" => "undefined",
      "temperature" => "23.91796875",
      "humidity" => "38.48828125",
      "battery_percentage" => "100",
      "ble-gateway" => "1",
      "ble-gateway-uuid" => "db45b855df33b2b6cb5f65d8c24e4ff2"
    )

    assert_equal Devices::MinewS1, @discovery[:device_class]
  end

  test "it discovers SKYBEACONs" do
    @discovery = discovery(
      "device" => "SKYBEACON 1",
      "datetime" => "1529938018855",
      "transmission_power" => "undefined",
      "temperature" => "25.125",
      "humidity" => "7.8125",
      "ble-gateway" => "1",
      "ble-gateway-uuid" => "db45b855df33b2b6cb5f65d8c24e4ff2"
    )

    assert_equal Devices::Skybeacon, @discovery[:device_class]
  end

  def discovery(mqtt_topics)
    mac = "aa:11:22:33:44:55"
    mqtt_topics.each do |key, value|
      @farm.mqtt_topic_states.create!(topic: "sensors/#{mac}/#{key}", contents: value)
    end

    MqttDeviceDiscoverer.new(@farm).discoveries[:discoveries]["sensors/#{mac}"]
  end
end
