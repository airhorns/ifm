# frozen_string_literal: true

require 'test_helper'

class MqttDevicePublicationInjesterTest < ActiveSupport::TestCase
  setup do
    @farm = farms(:bct)
    @injester = MqttDevicePublicationInjester.new(@farm)
    @sensor = @farm.device_configurations.detect { |device| device.data_address == "mqtt://sensors/BCDDC2E81300" }
  end

  test "it subscribes to the patterns for all configured mqtt devices" do
    @farm.mqtt_client.expects(:subscribe).with("sensors/BCDDC2E81300/+", "sensors/aa11aa11aa11/+")
    @injester.subscribe
  end

  test "it gets messages for the subscribed patterns and passes them off to the correct publisher" do
    @farm.mqtt_client.expects(:subscribe).with("sensors/BCDDC2E81300/+", "sensors/aa11aa11aa11/+")
    @farm.mqtt_client.expects(:get).returns(["sensors/BCDDC2E81300/temperature", "25.4"])
    @sensor.device_instance.publishers[:temperature].expects(:publish).with("25.4")
    @injester.subscribe
    @injester.injest_one
  end
end
