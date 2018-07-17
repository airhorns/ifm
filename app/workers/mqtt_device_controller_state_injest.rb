# frozen_string_literal: true

class MqttDeviceControllerStateInjest
  include Sidekiq::Worker
  include SidekiqDaemon::Worker
  # include TooLoudInDevelopment

  sidekiq_options retries: 0

  def perform(farm_id)
    farm = Farm.find(farm_id)
    injester = MqttDeviceControllerStateInjester.new(farm)
    if injester.subscribe
      loop do
        injester.loop
        break unless daemon_lock.checkin
      end
    end
  end
end
