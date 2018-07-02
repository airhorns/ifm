# frozen_string_literal: true
require 'test_helper'

module Devices
  class EspurnaSonoffBasicTest < ActiveSupport::TestCase
    setup do
      @device = device_configurations(:sonoff_basic).device_instance
      @device.farm.stubs(:mqtt_client).returns(stub)
    end

    test "it can turn a relay on and off" do
      @device.farm.mqtt_client.expects(:publish).with('sensors/aa11aa11aa11/relay/0', 'on', true, 1)
      @device.controllers[:relay_0].send_on!

      @device.farm.mqtt_client.expects(:publish).with('sensors/aa11aa11aa11/relay/0', 'off', true, 1)
      @device.controllers[:relay_0].send_off!
    end
  end
end
