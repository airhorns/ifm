# frozen_string_literal: true
module Types
  class DeviceDiscoveryLogType < BaseObject
    UNKNOWN_DEVIE_IMAGE = "/images/devices/unknown.jpg"

    global_id_field :id
    field :data_address, String, null: false
    field :last_seen, Types::DateTimeType, null: false
    field :device_class, String, null: false
    field :data, Types::JsonType, null: true
    field :device_name, String, null: false
    field :image_url, String, null: false
    field :proposed_configuration, Types::ProposedDeviceConfigurationType, null: false

    def device_name
      device_class.constantize.human_name
    end

    def image_url
      root_path = Dir.glob(Rails.root.join("public/images/devices/#{device_class.constantize.file_key}.*")).first
      if root_path
        root_path.sub(Rails.root.join('public').to_s, '')
      else
        UNKNOWN_DEVICE_IMAGE
      end
    end

    def proposed_configuration
      DeviceEnlister.propose_configuration(object)
    end
  end
end
