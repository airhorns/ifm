# frozen_string_literal: true

module DeviceComprehensions
  class Temperature
    def self.comprehend(value)
      Float(value)
    end
  end
end
