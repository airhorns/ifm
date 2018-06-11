# frozen_string_literal: true

class DeviceEnlister
  attr_reader :farm

  def initialize(farm)
    @farm = farm
  end

  def enlist(device_discovery_log, nickname, farm_zone_id)
    configuration = propose_configuration(device_discovery_log)
    configuration.farm_zone = farm.farm_zones.find(farm_zone_id)
    configuration.human_name = nickname
    DeviceConfiguration.transaction do
      if configuration.save
        device_discovery_log.device_configuration_id = configuration.id
        device_discovery_log.save
      end
    end
    configuration
  end

  def propose_configuration(device_discovery_log)
    DeviceConfiguration.new(
      farm_id: device_discovery_log.farm_id,
      device_class: device_discovery_log.device_class,
      data_address: device_discovery_log.data_address,
      last_seen: device_discovery_log.last_seen
    )
  end
end
