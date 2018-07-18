# frozen_string_literal: true

module Types
  class ControllerStateTransitionType < BaseObject
    field :id, ID, null: false
    field :device_controller_configuration, Types::DeviceControllerConfigurationType, null: false
    field :to_state, String, null: false
    field :initiator, String, null: false
    field :confirmed_at, Types::DateTimeType, null: true
    timestamps
  end
end
