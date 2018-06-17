# frozen_string_literal: true
module Types
  class DeviceControllerConfigurationInput < Types::BaseInputObject
    argument :id, ID, required: true
    argument :field, String, required: true
    argument :nickname, String, required: true
    argument :enabled, Boolean, required: false
  end
end
