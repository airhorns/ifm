# frozen_string_literal: true
module Types
  class DeviceDiscoveryLogType < BaseObject
    global_id_field :id
    field :mqtt_key, String, null: false
    field :last_seen, Types::DateTimeType, null: false
    field :device_class, String, null: false
    field :data, Types::JsonType, null: true
  end
end
