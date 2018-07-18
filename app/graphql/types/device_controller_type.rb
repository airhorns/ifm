# frozen_string_literal: true
module Types
  class DeviceControllerType < BaseObject
    field :field, String, null: false
    field :nickname, String, null: false
    field :human_name, String, null: false
    field :human_state, Types::DeviceControllerStateType, null: false
    field :control_strategy_human_name, String, null: false
    field :icon, String, null: false
    field :device_controller_configuration, Types::DeviceControllerConfigurationType, null: false

    def human_state
      object.current_state.to_s
    end

    def icon
      case object.class
      when DeviceControllers::EspurnaRelay
        "plug"
      else
        "cube"
      end
    end

    def control_strategy_human_name
      object.class.name.split('::')[-1].titleize
    end
  end
end
