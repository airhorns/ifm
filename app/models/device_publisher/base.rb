# frozen_string_literal: true

module DevicePublisher
  class Base
    attr_reader :device, :field, :comprehension, :config

    def initialize(device, field:, comprehension:, config: {})
      @device = device
      @field = field
      @comprehension = comprehension
      @config = config
    end

    def mqtt_state_for(topic)
      @device.farm.mqtt_topic_states.where(topic: @device.absolute_mqtt_topic(topic)).first
    end

    def comprehend(value)
      comprehension.comprehend(value)
    end
  end
end
