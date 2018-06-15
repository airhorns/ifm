# frozen_string_literal: true

module Types
  class CreateFarmZoneInput < Types::BaseInputObject
    argument :name, String, required: true
  end
end
