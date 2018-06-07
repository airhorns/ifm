# frozen_string_literal: true

module Devices
  class EspurnaSonoffTh < EspurnaSonoffBasic
    publishes :temperature, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::Temperature
    publishes :humidity, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::Humidity

    def self.human_name
      "Espurna Sonoff TH"
    end

    def self.discover(known_data)
      known_data['app'] == 'ESPURNA' && known_data['board'] == 'ITEAD_SONOFF_TH'
    end
  end
end
