# frozen_string_literal: true

module Types
  class DeleteFarmZoneInput < Types::BaseInputObject
    argument :id, ID, required: true
  end
end
