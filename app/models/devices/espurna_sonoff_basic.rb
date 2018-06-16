# frozen_string_literal: true

module Devices
  class EspurnaSonoffBasic < Base
    controls :relay_0, with: DeviceControllers::EspurnaRelay, config: { relay: 0 }

    publishes :uptime, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::Numeric
    publishes :rssi, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::Numeric
    publishes :freeheap, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::Numeric
    publishes :vcc, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::Numeric
    publishes :loadavg, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::Numeric

    publishes :ip, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::IpAddress
    publishes :mac, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::MacAddress
    publishes :app, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::String
    publishes :version, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::String
    publishes :board, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::String
    publishes :host, with: DevicePublisher::Espurna, comprehension: DeviceComprehensions::String

    def self.discover(known_data)
      known_data['app'] == 'ESPURNA' && known_data['board'] == 'ITEAD_SONOFF_BASIC'
    end
  end
end
