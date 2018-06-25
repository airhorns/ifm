# frozen_string_literal: true

module Types
  class ScheduleType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :enabled, Boolean, null: false
    field :scheduled_control_states, [Types::ScheduledControlStateType], null: false
  end
end
