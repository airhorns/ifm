# frozen_string_literal: true

class MqttInjestAllFarms
  include Sidekiq::Worker

  def perform
    Farm.find_in_batches do |farms|
      farms.each do |farm|
        MqttStateInjest.perform_async(farm.id)
      end
    end
  end
end
