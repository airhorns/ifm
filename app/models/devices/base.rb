# frozen_string_literal: true

module Devices
  class Base
    class_attribute :controllers
    class_attribute :publishers

    class << self
      def controls(field, with:, config: {})
        self.controllers ||= []
        self.controllers += [with.new(field, config)]
      end

      def publishes(field, with:, comprehension: DeviceComprehensions::Automatic, config: {})
        self.publishers ||= []
        self.publishers += [with.new(field, comprehension, config)]
      end
    end

    def initialize(mqtt)
    end

    def control(field)
    end
  end
end
