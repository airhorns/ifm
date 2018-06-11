# frozen_string_literal: true

module DeviceComprehensions
  class Temperature < DeviceComprehensions::Numeric
    def self.unit_string
      "°C"
    end
  end
end
