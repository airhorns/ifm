# frozen_string_literal: true

module DeviceComprehensions
  class Humidity < DeviceComprehensions::Numeric
    def self.unit_string
      "% RH"
    end
  end
end
