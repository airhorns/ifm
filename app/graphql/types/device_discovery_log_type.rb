# frozen_string_literal: true
module Types
  class DeviceDiscoveryLogType < BaseObject
    global_id_field :id
    field :data_address, String, null: false
    field :last_seen, Types::DateTimeType, null: false
    field :device_class, String, null: false
    field :data, Types::JsonType, null: true
    field :device_name, String, null: false

    def device_name
      device_class.constantize.human_name
    end
  end
end
