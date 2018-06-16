# frozen_string_literal: true

module Mutations
  class EnlistDevice < Mutations::BaseMutation
    null true

    argument :device_discovery_log_id, ID, required: true
    argument :device_nickname, String, required: true
    argument :farm_zone_id, ID, required: true
    argument :enlist_controls, [Types::EnlistControlInput], required: false

    field :device_configuration, Types::DeviceConfigurationType, null: true
    field :errors, [String], null: false

    def resolve(device_discovery_log_id:, device_nickname:, farm_zone_id:, enlist_controls: [])
      device_discovery_log = DeviceDiscoveryLog.find(device_discovery_log_id)
      device_configuration = DeviceEnlister.new(context[:current_farm]).enlist(device_discovery_log, device_nickname, farm_zone_id, enlist_controls)

      if device_configuration.save
        # Successful creation, return the created object with no errors
        {
          device_configuration: device_configuration,
          errors: [],
        }
      else
        # Failed save, return the errors to the client
        {
          device_configuration: nil,
          errors: device_configuration.errors.full_messages
        }
      end
    end
  end
end
