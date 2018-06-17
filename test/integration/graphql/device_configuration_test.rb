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

    test "update device configuration name and zone" do
      mutation = "
        mutation UpdateDeviceConfiguration($input: UpdateDeviceConfigurationInput!) {
          updateDeviceConfiguration(input: $input) {
            deviceConfiguration {
              humanName
              farmZone {
                name
              }
            }
            errors
          }
        }
      "

      result = IfmSchema.execute(
        mutation,
        context: @context,
        variables: {
          input: {
            id: @device_configuration.id,
            humanName: "New Device",
            farmZoneId: farm_zones(:bct_germination).id
          }
        }
      )

      assert_nil result.to_h["errors"]
      assert_equal [], result.to_h["data"]["updateDeviceConfiguration"]["errors"]

      assert_equal "New Device", result.to_h["data"]["updateDeviceConfiguration"]["deviceConfiguration"]["humanName"]
      assert_equal "New Device", @device_configuration.reload.human_name

      assert_equal farm_zones(:bct_germination).id, @device_configuration.reload.farm_zone.id
      assert_equal "Germination", result.to_h["data"]["updateDeviceConfiguration"]["deviceConfiguration"]["farmZone"]["name"]
    end

    test "update device configuration controller nicknames" do
      mutation = "
        mutation UpdateDeviceConfiguration($input: UpdateDeviceConfigurationInput!) {
          updateDeviceConfiguration(input: $input) {
            deviceConfiguration {
              controllers {
                field
                nickname
              }
            }
            errors
          }
        }
      "

      result = IfmSchema.execute(
        mutation,
        context: @context,
        variables: {
          input: {
            id: @device_configuration.id,
            deviceControllerConfigurations: [
              {
                id: @device_configuration.device_controller_configurations.first.id,
                field: "relay_0",
                nickname: "Bigger Pump",
                enabled: false
              }
            ]
          }
        }
      )

      assert_nil result.to_h["errors"]
      assert_equal [], result.to_h["data"]["updateDeviceConfiguration"]["errors"]

      controller_config = @device_configuration.reload.device_controller_configurations.first
      assert_equal "Bigger Pump", controller_config.nickname
      assert_equal false, controller_config.enabled
    end
  end
end
