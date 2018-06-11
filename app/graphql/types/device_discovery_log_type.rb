# frozen_string_literal: true
module Types
  class DeviceDiscoveryLogType < BaseObject
    include DeviceImageUrl

    global_id_field :id
    field :data_address, String, null: false
    field :last_seen, Types::DateTimeType, null: false
    field :device_class, String, null: false
    field :data, Types::JsonType, null: true
    field :device_name, String, null: false
    field :image_url, String, null: false
    field :proposed_configuration, Types::ProposedDeviceConfigurationType, null: false
    field :enlisted_configuration, Types::DeviceConfigurationType, null: true

    def device_name
      device_class.constantize.human_name
    end

    def proposed_configuration
      DeviceEnlister.new(context[:current_farm]).propose_configuration(object)
    end

    def enlisted_configuration
      object.device_configuration
    end
  end
end
