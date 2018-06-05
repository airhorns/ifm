# frozen_string_literal: true

module DeviceControllers
  class Base
    attr_reader :field, :config

    def initialize(field, config)
      @field = field
      @config = config
    end
  end
end
