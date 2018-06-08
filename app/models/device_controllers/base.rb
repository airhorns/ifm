# frozen_string_literal: true

module DeviceControllers
  class Base
    attr_reader :device, :field, :config

    def initialize(device, field:, config:)
      @device = device
      @field = field
      @config = config
    end

    def human_name
      @field.to_s.humanize
    end

    def mqtt_send(topic, contents)
      @device.farm.mqtt_client.publish(@device.absolute_mqtt_topic(topic), contents)
    end
  end
end
