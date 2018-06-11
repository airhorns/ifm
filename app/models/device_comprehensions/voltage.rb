# frozen_string_literal: true

module DeviceComprehensions
  class Voltage < DeviceComprehensions::Numeric
    def self.unit_string
      "V"
    end
  end
end
