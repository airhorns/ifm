# frozen_string_literal: true

class StaticDevicePublicationInjest
  include Sidekiq::Worker
  include SidekiqDaemon::Worker
  sidekiq_options retries: 0, daemon_lock_duration: 35

  def perform(farm_id)
    farm = Farm.find(farm_id)
    injester = StaticDevicePublicationInjester.new(farm)
    injester.injest_all
  end
end
