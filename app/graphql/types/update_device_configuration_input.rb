# frozen_string_literal: true

module Types
  class UpdateDeviceConfigurationInput < Types::BaseInputObject
    argument :human_name, String, required: false
    argument :farm_zone_id, ID, required: false
    argument :enlist_controls, [Types::EnlistControlInput], required: false
  end
end
