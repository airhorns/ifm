# frozen_string_literal: true

module Devices
  class EspurnaSonoffPowR2 < EspurnaSonoffBasic
    publishes :current, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::Temperature
    publishes :voltage, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::Humidity

    def self.human_name
      "Espurna Sonoff Pow R2"
    end

    def self.discover(known_data)
      known_data['app'] == 'ESPURNA' && known_data['board'] == 'ITEAD_SONOFF_POW_R2'
    end
  end
end
