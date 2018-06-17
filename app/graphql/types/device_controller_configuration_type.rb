# frozen_string_literal: true
module Types
  class DeviceControllerConfigurationType < BaseObject
    global_id_field :id
    field :field, String, null: false
    field :nickname, String, null: false
    field :enabled, Boolean, null: false
    field :controller, Types::DeviceControllerType, null: false

    def controllers
      object.device_instance.controllers.values
    end
  end
end
