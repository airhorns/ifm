# frozen_string_literal: true

module Types
  class FarmZoneType < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :device_configurations, [Types::DeviceConfigurationType], null: false
  end
end
