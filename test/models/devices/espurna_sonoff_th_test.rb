# frozen_string_literal: true
require 'test_helper'

module Devices
  class EspurnaSonoffThTest < ActiveSupport::TestCase
    setup do
      @device = device_configurations(:sonoff_th).device_instance
      @device.farm.stubs(:mqtt_client).returns(stub)
    end

    test "it can turn a relay on and off" do
      @device.farm.mqtt_client.expects(:publish).with('sensors/BCDDC2E81300/relay/0/set', 'on', true, 1)
      @device.controllers[:relay_0].control!("on")

      @device.farm.mqtt_client.expects(:publish).with('sensors/BCDDC2E81300/relay/0/set', 'off', true, 1)
      @device.controllers[:relay_0].control!("off")
    end
  end
end
