# frozen_string_literal: true
module Types
  class DeviceConfigurationType < BaseObject
    include DeviceImageUrl

    global_id_field :id
    field :data_address, String, null: false
    field :human_name, String, null: false
    field :last_seen, Types::DateTimeType, null: false
    field :device_class, String, null: false
    field :device_name, String, null: false
    field :data, Types::JsonType, null: true
    field :device_discovery_log, Types::DeviceDiscoveryLogType, null: true
    field :farm_zone, Types::FarmZoneType, null: false
    field :image_url, String, null: false

    def device_name
      device_class.constantize.human_name
    end
  end
end
