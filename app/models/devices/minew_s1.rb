# frozen_string_literal: true

module Devices
  class MinewS1 < Base
    publishes :temperature, with: DevicePublisher::BLEGateway, comprehension: DeviceComprehensions::Temperature
    publishes :humidity, with: DevicePublisher::BLEGateway, comprehension: DeviceComprehensions::Humidity
    publishes :battery_percentage, with: DevicePublisher::BLEGateway, comprehension: DeviceComprehensions::BatteryPercentage

    def self.discover(known_data)
      known_data['ble-gateway'] && known_data['device'] == 'Minew S1'
    end
  end
end
