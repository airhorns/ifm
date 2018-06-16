# frozen_string_literal: true

module Mutations
  class UpdateDeviceConfiguration < ResourceAndChildrenMutation
    null true

    argument :input, Types::UpdateDeviceConfigurationInput, required: true

    field :device_configuration, Types::DeviceConfigurationType, null: true
    field :errors, [String], null: false

    def mutatable_associations
      []
    end
  end
end
