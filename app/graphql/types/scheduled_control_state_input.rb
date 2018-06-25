# frozen_string_literal: true
module Types
  class ScheduledControlStateInput < Types::BaseInputObject
    argument :id, ID, required: false
    argument :device_controller_configuration_id, ID, required: true
    argument :recurrence, Types::RecurrenceInput, required: true
    argument :desired_state, Types::DeviceControllerStateType, required: true
  end
end
