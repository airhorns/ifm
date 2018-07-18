# frozen_string_literal: true

require 'test_helper'

module Graphql
  class DeviceControllerStateTest < ActiveSupport::TestCase
    setup do
      @farm = farms(:bct)
      @context = { current_farm: @farm }
      @device_controller_configuration = device_controller_configurations(:sonoff_th_relay_0)
    end

    test "updating device state" do
      query = "
      mutation updateDeviceControllerState($input: UpdateDeviceControllerStateInput!) {
        updateDeviceControllerState(input: $input) {
          deviceControllerConfiguration {
            id
          }
          controllerStateTransition {
            toState
            confirmedAt
          }
        }
      }
      "
      stub_mqtt_client.expects(:publish).with("sensors/BCDDC2E81300/relay/0/set", "on", anything, anything)
      Farm.any_instance.expects(:mqtt_client).returns(stub_mqtt_client).at_least_once

      result = IfmSchema.execute(query, context: @context, variables: { input: { id: @device_controller_configuration.id, state: "on" } })
      assert_equal "on", result.to_h["data"]["updateDeviceControllerState"]["controllerStateTransition"]["toState"]
      assert_nil result.to_h["data"]["updateDeviceControllerState"]["controllerStateTransition"]["confirmedAt"]
      assert_equal @device_controller_configuration.id.to_s, result.to_h["data"]["updateDeviceControllerState"]["deviceControllerConfiguration"]["id"]
    end
  end
end
