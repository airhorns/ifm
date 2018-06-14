# frozen_string_literal: true

module Types
  class FarmType < BaseObject
    field :name, String, null: false
    field :farm_zones, [FarmZoneType], null: false
  end
end
