# frozen_string_literal: true

module Devices
  class Base
    class_attribute :controllers
    self.controllers = {}
    class_attribute :publishers
    self.publishers = {}

    class << self
      def inherited(_subclass)
        self.controllers = controllers.clone
        self.publishers = publishers.clone
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

    attr_reader :farm, :config, :controllers, :publishers

    def initialize(farm, config)
      @farm = farm
      @config = config
      @controllers = self.class.controllers.transform_values do |attributes|
        attributes[:with].new(self, field: attributes[:field], config: attributes[:config])
      end
      @publishers = self.class.publishers.transform_values do |attributes|
        attributes[:with].new(self, field: attributes[:field], comprehension: attributes[:comprehension], config: attributes[:config])
      end
    end

    def absolute_mqtt_topic(topic)
      [config['mqtt_key'], topic].join('/')
    end
  end
end
