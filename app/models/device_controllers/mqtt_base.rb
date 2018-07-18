# frozen_string_literal: true

module DeviceControllers
  class MqttBase < Base
    attr_reader :mqtt_key

    def mqtt?
      true
    end

    def absolute_mqtt_topic
      @device.absolute_mqtt_topic(@mqtt_key)
    end

    def mqtt_topic_pattern
      @device.absolute_mqtt_topic(@mqtt_key)
    end

    def mqtt_send(topic, contents)
      Rails.logger.info "Sending MQTT message: topic=#{@device.absolute_mqtt_topic(topic)} contents=#{contents}"
      @device.farm.mqtt_client.publish(@device.absolute_mqtt_topic(topic), contents, true, 1)
      @device.farm.mqtt_client.mqtt_loop
    end

    def mqtt_get(topic)
      if topic_state = device.configuration.mqtt_topic_state_for(@device.absolute_mqtt_topic(topic))
        topic_state.contents
      else
        :unknown
      end
    end

    def interpret_message(_topic, _message)
      raise NotImplementedError
    end

    def control!(new_state)
      mqtt_send(absolute_mqtt_topic, new_state)
    end

    def current_state
      raise "Controller needs an mqtt key set in the subclass" unless @mqtt_key.present?
      mqtt_get(@mqtt_key).try(&:to_sym) || :nil
    end
  end
end
