# frozen_string_literal: true
module Types
  class DeviceControllerConfigurationType < BaseObject
    global_id_field :id
    field :field, String, null: false
    field :nickname, String, null: false
    field :full_name, String, null: false
    field :icon, String, null: false
    field :enabled, Boolean, null: false
    field :controller, Types::DeviceControllerType, null: false
    field :device_configuration, Types::DeviceConfigurationType, null: false
    field :controller_state_transitions, [Types::ControllerStateTransitionType], null: false

    def controller_state_transitions
      object.controller_state_transitions.order("created_at DESC").limit(50)
    end

    def full_name
      "#{object.nickname} (#{object.controller.human_name} on #{object.device_configuration.human_name})"
    end
  end
end
