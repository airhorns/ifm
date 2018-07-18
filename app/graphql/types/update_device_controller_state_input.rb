# frozen_string_literal: true

module Types
  class UpdateDeviceControllerStateInput < Types::BaseInputObject
    argument :id, ID, required: true
    argument :state, String, required: true
  end
end
