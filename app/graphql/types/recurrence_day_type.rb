# frozen_string_literal: true

module Types
  class RecurrenceDayType < Types::BaseObject
    field :day, Int, null: false
    field :field, [Int], null: true
  end
end
