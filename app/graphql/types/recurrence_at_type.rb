# frozen_string_literal: true

module Types
  class RecurrenceAtType < Types::BaseObject
    field :hour, Int, null: false
    field :minute, Int, null: false
    field :second, Int, null: false
  end
end
