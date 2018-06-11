# frozen_string_literal: true

module Devices
  class Base
    class << self
      attr_accessor :controllers, :publishers

      def inherited(subclass)
        subclass.controllers = controllers.try(:clone) || {}
        subclass.publishers = publishers.try(:clone) || {}
      end

      def controls(field, with:, config: {})
        controllers[field] = { field: field, with: with, config: config }
      end

      def publishes(field, with:, comprehension: DeviceComprehensions::Automatic, config: {})
        publishers[field] = { field: field, with: with, comprehension: comprehension, config: config }
      end

      def human_name
        name.split("::")[-1].titleize
      end

      def file_key
        name.split("::")[-1].underscore
      end
    end

    attr_reader :farm, :configuration, :controllers, :publishers

    def initialize(farm, configuration)
      @farm = farm
      @configuration = configuration
      @controllers = self.class.controllers.transform_values do |attributes|
        attributes[:with].new(self, field: attributes[:field], config: attributes[:config])
      end
      @publishers = self.class.publishers.transform_values do |attributes|
        attributes[:with].new(self, field: attributes[:field], comprehension: attributes[:comprehension], config: attributes[:config])
      end
    end

    def absolute_mqtt_topic(topic)
      [mqtt_key, topic].join('/')
    end

    def tags
      @tags ||= { device: self.class.file_key, name: configuration.human_name }
    end

    private

    def mqtt_key
      @mqtt_key ||= if configuration.data_address.start_with?('mqtt')
        configuration.data_address.sub("mqtt://", '')
      else
        raise "Can't get MQTT key for non mqtt device"
      end
    end
  end
end
