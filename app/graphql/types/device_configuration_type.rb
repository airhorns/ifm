# frozen_string_literal: true
module Types
  class DeviceConfigurationType < BaseObject
    global_id_field :id
    field :mac_address, String, null: false
    field :human_name, String, null: false
    field :last_seen, Types::DateTimeType, null: false
    field :device_class, String, null: false
    field :data, Types::JsonType, null: true
  end
end
