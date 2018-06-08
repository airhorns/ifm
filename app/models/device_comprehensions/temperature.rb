# frozen_string_literal: true

module DeviceComprehensions
  class Temperature < Base
    def self.unit_string
      "°C"
    end

    def self.comprehend(value)
      Float(value)
    end
  end
end
