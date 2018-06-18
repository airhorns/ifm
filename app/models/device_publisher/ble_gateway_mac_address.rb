# frozen_string_literal: true

module DevicePublisher
  class BLEGatewayMacAddress < Base
    def static?
      true
    end

    def get
      @device.configuration.mqtt_topic_space.split('/')[-1]
    end

    def cached_value
      get
    end
  end
end
