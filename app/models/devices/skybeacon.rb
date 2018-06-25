# frozen_string_literal: true

module Devices
  class Skybeacon < Base
    publishes :temperature, with: DevicePublisher::BLEGateway, comprehension: DeviceComprehensions::Temperature
    publishes :humidity, with: DevicePublisher::BLEGateway, comprehension: DeviceComprehensions::Humidity
    publishes :local_name, with: DevicePublisher::BLEGateway, comprehension: DeviceComprehensions::String

    def self.discover(known_data)
      known_data['ble-gateway'] && known_data['device'] == 'SKYBEACON 1'
    end
  end
end
