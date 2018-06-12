# frozen_string_literal: true
require 'test_helper'

module Devices
  class EspurnaSonoffBasicTest < ActiveSupport::TestCase
    setup do
      @device = device_configurations(:sonoff_basic).device_instance
    end

    test "it can turn a relay on and off" do
      @device.farm.mqtt_client.expects(:publish).with('sensors/aa11aa11aa11/relay/0', 'on')
      @device.controllers[:relay_0].send_on!

      @device.farm.mqtt_client.expects(:publish).with('sensors/aa11aa11aa11/relay/0', 'off')
      @device.controllers[:relay_0].send_off!
    end
  end
end