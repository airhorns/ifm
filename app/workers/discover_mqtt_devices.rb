# frozen_string_literal: true

class DiscoverMqttDevices
  include Sidekiq::Worker

  def perform(farm_id)
    farm = Farm.find(farm_id)
    MqttDeviceDiscoverer.new(farm).discover_and_save!
  end
end
