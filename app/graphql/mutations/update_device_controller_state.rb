# frozen_string_literal: true

module Mutations
  class UpdateDeviceControllerState < Mutations::BaseMutation
    null true

    argument :input, Types::UpdateDeviceControllerStateInput, required: true

    field :device_controller, Types::DeviceControllerType, null: true
    field :device_controller_configuration, Types::DeviceControllerConfigurationType, null: true
    field :controller_state_transition, Types::ControllerStateTransitionType, null: true
    field :errors, [String], null: false

    def resolve(input:)
      input = input.to_h
      farm = context[:current_farm]
      device_controller_configuration = farm.device_controller_configurations.find(input[:id])
      manager = ControllerStateManager.new(farm, 'Web Client')
      transition = manager.control!(device_controller_configuration, input[:state])

      if transition.persisted?
        # Successful creation, return the created object with no errors
        {
          controller_state_transition: transition,
          device_controller_configuration: device_controller_configuration,
          device_controller: device_controller_configuration.controller,
          errors: [],
        }
      else
        # Failed save, return the errors to the client
        {
          controller_state_transition: nil,
          device_controller_configuration: device_controller_configuration,
          device_controller: device_controller_configuration.controller,
          errors: controller_state_transition.errors.full_messages
        }
      end
    end
  end
end
