# frozen_string_literal: true
module Types
  class UpdateScheduledControlStateInput < Types::BaseInputObject
    argument :id, ID, required: true
    argument :recurrence, Types::RecurrenceInput, required: true
    argument :desired_state, Types::DeviceControllerStateType, required: true
  end
end
