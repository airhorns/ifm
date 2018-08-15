# frozen_string_literal: true

module Types
  class EnlistDeviceInput < Types::BaseInputObject
    argument :id, ID, required: true
    argument :device_nickname, String, required: true
    argument :farm_zone_id, ID, required: true
    argument :enlist_controls, [Types::EnlistControlInput], required: false
  end
end
