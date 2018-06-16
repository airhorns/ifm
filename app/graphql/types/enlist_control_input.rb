# frozen_string_literal: true
module Types
  class EnlistControlInput < Types::BaseInputObject
    argument :field, String, required: true
    argument :control_nickname, String, required: true
    argument :enabled, Boolean, required: false, default_value: true
  end
end
