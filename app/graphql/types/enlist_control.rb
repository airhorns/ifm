# frozen_string_literal: true
module Types
  class EnlistControl < Types::BaseInputObject
    argument :field, String, required: true
    argument :control_nickname, String, required: true
    argument :enabled, Boolean, required: true
  end
end
