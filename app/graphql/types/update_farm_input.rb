# frozen_string_literal: true

module Types
  class UpdateFarmInput < Types::BaseInputObject
    argument :name, String, required: false
    argument :create_farm_zones, [Types::CreateFarmZoneInput], required: false
    argument :farm_zones, [Types::UpdateFarmZoneInput], required: false
    argument :delete_farm_zones, [Types::DeleteFarmZoneInput], required: false
  end
end
