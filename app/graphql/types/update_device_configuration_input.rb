# frozen_string_literal: true

module Types
  class UpdateDeviceConfigurationInput < Types::BaseInputObject
    argument :id, ID, required: true
    argument :human_name, String, required: false
    argument :farm_zone_id, ID, required: false
    argument :device_controller_configurations, [Types::DeviceControllerConfigurationInput], required: false
  end
end
