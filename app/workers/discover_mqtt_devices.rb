# frozen_string_literal: true

class DiscoverMqttDevices
  include Sidekiq::Worker

  def perform(farm_id)
    farm = Farm.find(farm_id)
    discoverer = MqttDeviceDiscoverer.new(farm)
    discoverer.discoveries.each do |key, (device_class, attribute_group)|
      discovery = DeviceDiscoveryLog.find_or_initialize_by(farm_id: farm.id, mqtt_key: key)
      discovery.device_class = device_class.name
      discovery.data = attribute_group
      discovery.last_seen = Time.now.utc
      discovery.save!
    end
  end
end
