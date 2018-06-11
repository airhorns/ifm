# frozen_string_literal: true

module DevicePublisher
  class MqttBase < Base
    def initialize(*args)
      super
      @mqtt_key = field.to_s
    end

    def absolute_mqtt_topic
      @device.absolute_mqtt_topic(@mqtt_key)
    end

    def mqtt_topic_pattern
      @device.absolute_mqtt_topic('+')
    end
  end
end
