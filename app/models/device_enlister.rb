# frozen_string_literal: true

module DeviceEnlister
  def propose_configuration(discovery_log)
    DeviceConfiguration.new(
      farm_id: discovery_log.farm_id,
      device_class: discovery_log.device_class,
      data_address: discovery_log.data_address
    )
  end
end
