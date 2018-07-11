# frozen_string_literal: true

module DeviceControllers
  class Base
    attr_reader :device, :field, :config

    def initialize(device, field:, config:)
      @device = device
      @field = field
      @config = config
    end

    def nickname
      if @device.configuration.persisted?
        device_controller_configuration.nickname
      end
    end

    def human_name
      @field.to_s.humanize
    end

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

    def tags
      @tags ||= { field: @field }.merge(@device.tags)
    end

    def device_controller_configuration
      @device.configuration.device_controller_configurations.detect { |config| config.field == @field.to_s }
    end

    def current_state
      raise NotImplementedError
    end
  end
end
