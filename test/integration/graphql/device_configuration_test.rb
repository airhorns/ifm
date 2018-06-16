# frozen_string_literal: true

require 'test_helper'

module Graphql
  class DeviceConfigurationTest < ActiveSupport::TestCase
    setup do
      @farm = farms(:bct)
      @context = { current_farm: @farm }
      @device_configuration = device_configurations(:sonoff_th)
    end

    test "getting device configuration" do
      query = "
      query getDeviceConfiguration($id: ID!) {
        deviceConfiguration(id: $id) {
          id
          imageUrl
          humanName
          deviceName
          lastSeen
          publishers {
            humanName
            humanValue
            comprehensionHumanName
            comprehensionUnit
            icon
          }
          controllers {
            field
            nickname
            humanName
            humanState
            controlStrategyHumanName
            icon
          }
          farmZone {
            name
          }
        }
      }
      "
      result = IfmSchema.execute(query, context: @context, variables: { id: @device_configuration.id })

      assert_equal "Test Sonoff TH", result.to_h["data"]["deviceConfiguration"]["humanName"]
      assert_equal "Aisle 1", result.to_h["data"]["deviceConfiguration"]["farmZone"]["name"]
    end
  end
end
