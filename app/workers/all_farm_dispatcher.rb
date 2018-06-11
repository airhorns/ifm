# frozen_string_literal: true

class AllFarmDispatcher
  include Sidekiq::Worker

  def perform
    Farm.find_in_batches do |farms|
      farms.each do |farm|
        MqttStateInjest.perform_async(farm.id)
        MqttDevicePublicationInjest.perform_async(farm.id)
        DiscoverMqttDevices.perform_async(farm.id)
      end
    end
  end
end
