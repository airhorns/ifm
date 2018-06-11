# frozen_string_literal: true

module DeviceComprehensions
  class Power < DeviceComprehensions::Numeric
    def self.unit_string
      "W"
    end
  end
end
