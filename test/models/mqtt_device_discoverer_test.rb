# frozen_string_literal: true

require 'test_helper'

class MqttDeviceDiscovererTest < ActiveSupport::TestCase
  setup do
    @farm = farms(:bct)
  end

  test "it finds the three devices in the fixtures" do
    @discoverer = MqttDeviceDiscoverer.new(@farm)
    assert_equal Devices::MinewS1, @discoverer.discoveries["sensors/ac:23:3f:a0:3b:16"][0]
    assert_equal Devices::EspurnaSonoffTh, @discoverer.discoveries["sensors/BCDDC2E81300"][0]
  end
end
