# frozen_string_literal: true

class AllFarmDispatcher
  include Sidekiq::Worker

  def perform(frequency)
    Farm.find_in_batches do |farms|
      farms.each do |farm|
        if frequency == 'frequent'
          MqttStateInjest.perform_async(farm.id)
          MqttDevicePublicationInjest.perform_async(farm.id)
          DiscoverMqttDevices.perform_async(farm.id)
          DeviceControllerStateInstrumentationPublish.perform_async(farm.id)
        elsif frequency == 'rare'
          StaticDevicePublicationInjest.perform_async(farm.id)
        end
      end
    end
  end
end
