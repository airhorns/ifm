# frozen_string_literal: true

class MqttDevicePublicationInjest
  include Sidekiq::Worker
  include SidekiqDaemon::Worker
  sidekiq_options retries: 0

  def perform(farm_id)
    farm = Farm.find(farm_id)
    injester = MqttDevicePublicationInjester.new(farm)
    if injester.subscribe
      loop do
        5.times { injester.injest_one }
        daemon_lock.renew
      end
    end
  end
end
