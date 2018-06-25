# frozen_string_literal: true

module Types
  class UpdateScheduleInput < Types::BaseInputObject
    argument :id, ID, required: false
    argument :name, String, required: true
    argument :enabled, Boolean, required: true
    argument :scheduled_control_states, [Types::UpdateScheduledControlStateInput], required: true
    argument :create_scheduled_control_states, [Types::CreateScheduledControlStateInput], required: true
  end
end
