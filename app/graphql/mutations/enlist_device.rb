# frozen_string_literal: true

module Mutations
  class EnlistDevice < Mutations::BaseMutation
    null true

    argument :input, Types::EnlistDeviceInput, required: true

    field :device_configuration, Types::DeviceConfigurationType, null: true
    field :errors, [String], null: false

    def resolve(input:)
      device_discovery_log = DeviceDiscoveryLog.find(input[:id])
      device_configuration = DeviceEnlister.new(context[:current_farm]).enlist(
        device_discovery_log,
        input[:device_nickname],
        input[:farm_zone_id],
        input[:enlist_controls]
      )

      if device_configuration.save
        {
          device_configuration: device_configuration,
          errors: [],
        }
      else
        {
          device_configuration: nil,
          errors: device_configuration.errors.full_messages
        }
      end
    end
  end
end
