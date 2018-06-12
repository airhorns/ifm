# frozen_string_literal: true
module Types
  class DeviceConfigurationType < BaseObject
    include DeviceImageUrl

    global_id_field :id
    field :data_address, String, null: false
    field :human_name, String, null: false
    field :human_name_with_zone, String, null: false
    field :last_seen, Types::DateTimeType, null: false
    field :device_class, String, null: false
    field :device_name, String, null: false
    field :publishers, [Types::DevicePublisherType], null: false
    field :controllers, [Types::DeviceControllerType], null: false
    field :data, Types::JsonType, null: true
    field :device_discovery_log, Types::DeviceDiscoveryLogType, null: true
    field :farm_zone, Types::FarmZoneType, null: false
    field :image_url, String, null: false

    def human_name_with_zone
      object.human_name + " - " + object.farm_zone.name
    end

    def device_name
      device_class.constantize.human_name
    end

    def publishers
      object.device_instance.publishers.values
    end

    def controllers
      object.device_instance.controllers.values
    end
  end
end
