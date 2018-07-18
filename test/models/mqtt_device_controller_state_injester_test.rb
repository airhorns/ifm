# frozen_string_literal: true

require 'test_helper'

class MqttDeviceControllerStateInjesterTest < ActiveSupport::TestCase
  setup do
    @farm = farms(:bct)
    @farm.stubs(:mqtt_client).returns(stub_mqtt_client)
    @injester = MqttDeviceControllerStateInjester.new(@farm)
    @controller = @farm
      .device_configurations
      .detect { |device| device.data_address == "mqtt://sensors/BCDDC2E81300" }
      .device_instance
      .controllers[:relay_0]
  end

  test "it subscribes to the patterns for all configured mqtt controller devices" do
    @farm.mqtt_client.expects(:subscribe).with(["sensors/BCDDC2E81300/relay/#", 2], ["sensors/aa11aa11aa11/relay/#", 2])
    @injester.subscribe
  end

  test "it returns false if there are no subscriptions to be had" do
    @farm.device_configurations.destroy_all
    @farm.reload
    @injester = MqttDeviceControllerStateInjester.new(@farm)
    @farm.mqtt_client.expects(:subscribe).never
    assert_equal false, @injester.subscribe
  end

  test "it gets messages for the subscribed patterns and updates state transitions" do
    transition_record = @injester.controller_state_manager.start_transition(@controller.device_controller_configuration, :on)
    assert_equal "on", transition_record.to_state
    assert_nil transition_record.confirmed_at

    @farm.mqtt_client.expects(:subscribe).with(["sensors/BCDDC2E81300/relay/#", 2], ["sensors/aa11aa11aa11/relay/#", 2])
    @injester.subscribe
    @injester.process_packet(mock(topic: "sensors/BCDDC2E81300/relay/0", payload: "1"))

    transition_record.reload
    assert_not_nil transition_record.confirmed_at
  end
end
