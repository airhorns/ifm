# frozen_string_literal: true

module DevicePublisher
  class Base
    attr_reader :field, :comprehension, :config

    def initialize(field, comprehension, config = {})
      @field = field
      @comprehension = comprehension
      @config = config
    end
  end
end
