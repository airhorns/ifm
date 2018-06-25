# frozen_string_literal: true

module Types
  class ScheduledControlStateType < Types::BaseObject
    field :id, ID, null: false
    field :recurrence, Types::RecurrenceType, null: false
    field :desired_state, Types::DeviceControllerStateType, null: false
    field :device_controller_configuration, Types::DeviceControllerConfigurationType, null: false
  end
end
