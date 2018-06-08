# frozen_string_literal: true

module Mutations
  class EnlistDevice < Mutations::BaseMutation
    null true

    argument :device_discovery_log_id, ID, required: true

    field :device_configuration, Types::DeviceConfigurationType, null: true
    field :error_messages, [String], null: false

    def resolve(device_discovery_log_id:)
      device_discovery_log = DeviceDiscoveryLog.find(device_discovery_log_id)
      device_configuration = DeviceEnlister.enlist(device_discovery_log)

      if device_configuration.save
        # Successful creation, return the created object with no errors
        {
          device_configuration: device_configuration,
          errors: [],
        }
      else
        # Failed save, return the errors to the client
        {
          comment: nil,
          errors: device_configuration.errors.full_messages
        }
      end
    end
  end
end
