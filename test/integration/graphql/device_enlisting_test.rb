# frozen_string_literal: true

require 'test_helper'

module Graphql
  class DeviceEnlistingTest < ActiveSupport::TestCase
    setup do
      @farm = farms(:bct)
      @farm_zone = farm_zones(:bct_aisle_1)
      @discoverer = MqttDeviceDiscoverer.new(@farm)
      @context = { current_farm: @farm }
    end

    test "getting devices for enlisting" do
      query = "
        query enlist($id: ID!) {
          deviceDiscoveryLog(id: $id) {
            id
            imageUrl
            dataAddress
            deviceName
            lastSeen
            proposedConfiguration {
              publishers {
                humanName
                comprehensionHumanName
                comprehensionUnit
                icon
              }
              controllers {
                humanName
                controlStrategyHumanName
                icon
              }
            }
          }
          farmZones {
            id
            name
          }
        }
      "
      @discoverer.discover_and_save!
      @log = DeviceDiscoveryLog.where(mqtt_key: "sensors/BCDDC2E81300").first

      result = IfmSchema.execute(
        query,
        context: @context,
        variables: { id: IfmSchema.new.id_from_object(@log, DeviceDiscoveryLog, @context) }
      )

      assert_equal 'mqtt://sensors/BCDDC2E81300', result.to_h["data"]["deviceDiscoveryLog"]["dataAddress"]
    end

    test "enlisting devices" do
      mutation = "
        mutation($input: EnlistDeviceInput!) {
          enlistDevice(input: $input) {
            deviceConfiguration {
              id
              dataAddress
              humanName
              farmZone {
                id
              }
              deviceDiscoveryLog {
                id
              }
            }
            errors
          }
        }
      "
      @discoverer.discover_and_save!
      @log = DeviceDiscoveryLog.where(mqtt_key: "sensors/ac:23:3f:a0:3b:16").first

      result = IfmSchema.execute(
        mutation,
        context: @context,
        variables: {
          input: {
            id: @log.id,
            deviceNickname: "Enlisted Doodad",
            farmZoneId: @farm_zone.id,
          }
        }
      )

      assert_equal [], result['data']['enlistDevice']['errors']
      assert_equal @log.id.to_s, result['data']['enlistDevice']['deviceConfiguration']['deviceDiscoveryLog']['id']
      assert_equal @farm_zone.id.to_s, result['data']['enlistDevice']['deviceConfiguration']['farmZone']['id']
      assert_equal "Enlisted Doodad", result['data']['enlistDevice']['deviceConfiguration']['humanName']
      assert_equal "mqtt://sensors/ac:23:3f:a0:3b:16", result['data']['enlistDevice']['deviceConfiguration']['dataAddress']
    end

    test "enlisting devices with controllers" do
      mutation = "
      mutation($input: EnlistDeviceInput!) {
        enlistDevice(input: $input) {
            deviceConfiguration {
              id
              dataAddress
              humanName
              farmZone {
                id
              }
              deviceDiscoveryLog {
                id
              }
              controllers {
                field
                humanName
              }
            }
            errors
          }
        }
      "
      @discoverer.discover_and_save!
      @log = DeviceDiscoveryLog.where(mqtt_key: "sensors/5CCF7F7F95C7").first

      result = IfmSchema.execute(
        mutation,
        context: @context,
        variables: {
          input: {
            id: @log.id,
            deviceNickname: "Enlisted Doodad with Control",
            farmZoneId: @farm_zone.id,
            enlistControls: [{ field: "relay_0", controlNickname: "Pump relay" }]
          }
        }
      )

      assert_equal [], result['data']['enlistDevice']['errors']
      assert_equal @log.id.to_s, result['data']['enlistDevice']['deviceConfiguration']['deviceDiscoveryLog']['id']
      assert_equal @farm_zone.id.to_s, result['data']['enlistDevice']['deviceConfiguration']['farmZone']['id']
      assert_equal "Enlisted Doodad with Control", result['data']['enlistDevice']['deviceConfiguration']['humanName']
      assert_equal "mqtt://sensors/5CCF7F7F95C7", result['data']['enlistDevice']['deviceConfiguration']['dataAddress']
    end

    test "enlisting devices with controllers shouldn't work unless a value is provided for each controller" do
      mutation = "
      mutation($input: EnlistDeviceInput!) {
        enlistDevice(input: $input) {
            deviceConfiguration {
              id
            }
            errors
          }
        }
      "
      @discoverer.discover_and_save!
      @log = DeviceDiscoveryLog.where(mqtt_key: "sensors/5CCF7F7F95C7").first

      result = IfmSchema.execute(
        mutation,
        context: @context,
        variables: {
          input: {
            id: @log.id,
            deviceNickname: "Enlisted Doodad with Control",
            farmZoneId: @farm_zone.id,
            enlistControls: []
          }
        }
      )

      assert_not_equal [], result['data']['enlistDevice']['errors']
      assert_nil result['data']['deviceConfiguration']
    end
  end
end
