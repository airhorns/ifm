# frozen_string_literal: true

module Devices
  class XiaomiBleHt < Base
    publishes :temperature, with: DevicePublisher::BLEGateway, comprehension: DeviceComprehensions::Temperature
    publishes :humidity, with: DevicePublisher::BLEGateway, comprehension: DeviceComprehensions::Humidity
    publishes :mac, with: DevicePublisher::BLEGatewayMacAddress, comprehension: DeviceComprehensions::MacAddress

    def self.human_name
      "Xiaomi BLE Hygrometer"
    end

    def self.discover(known_data)
      known_data['ble-gateway'] && known_data['device'] == 'Xiaomi Mijia BTLE TH'
    end
  end
end
