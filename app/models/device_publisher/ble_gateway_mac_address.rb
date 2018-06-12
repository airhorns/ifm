# frozen_string_literal: true

module DevicePublisher
  class BLEGatewayMacAddress < Base
    def cached_value
      @device.mqtt_key.split('/')[-1]
    end
  end
end
