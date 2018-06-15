# frozen_string_literal: true

module Types
  class UpdateFarmZoneInput < Types::BaseInputObject
    argument :id, ID, required: true
    argument :name, String, required: false
  end
end
