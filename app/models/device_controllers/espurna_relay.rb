# frozen_string_literal: true

module DeviceControllers
  class EspurnaRelay < Base
    def initialize(*args)
      super
      @mqtt_key = "relay/#{config[:relay]}"
    end

    def human_name
      "Relay #{config[:relay]}"
    end

    def send_on!
      mqtt_send(@mqtt_key, 'on')
    end

    def send_off!
      mqtt_send(@mqtt_key, 'off')
    end
  end
end
