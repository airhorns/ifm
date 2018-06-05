# frozen_string_literal: true

module Devices
  class XiaomiBleHt < Base
    publishes :temperature, with: DevicePublisher::BLEGateway, comprehension: DeviceComprehensions::Temperature
    publishes :humidity, with: DevicePublisher::BLEGateway, comprehension: DeviceComprehensions::Humidity

    def self.discover(known_data)
      known_data['ble-gateway'] && known_data['device'] == 'Xiaomi Mijia BTLE TH'
    end
  end
end
