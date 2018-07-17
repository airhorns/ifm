# frozen_string_literal: true

module DeviceControllers
  class MqttBase < Base
    def mqtt_send(topic, contents)
      @device.farm.mqtt_client.publish(@device.absolute_mqtt_topic(topic), contents, true, 1)
    end

    def mqtt_get(topic)
      if topic_state = device.configuration.mqtt_topic_state_for(@device.absolute_mqtt_topic(topic))
        topic_state.contents
      else
        :unknown
      end
    end

    def current_state
      raise "Controller needs an mqtt key set in the subclass" unless @mqtt_key.present?
      mqtt_get(@mqtt_key).try(&:to_sym) || :nil
    end
  end
end
