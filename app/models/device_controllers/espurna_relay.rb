# frozen_string_literal: true

module DeviceControllers
  class EspurnaRelay < MqttBase
    def initialize(*args)
      super
      @mqtt_key = "relay/#{config[:relay]}"
    end

    def mqtt_topic_pattern
      @device.absolute_mqtt_topic("relay/#")
    end

    def human_name
      "Relay #{config[:relay]}"
    end

    def current_state
      case mqtt_get(@mqtt_key)
      when "0" then :off
      when "1" then :on
      else :unknown
      end
    end
  end
end
