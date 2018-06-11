# frozen_string_literal: true

module DeviceComprehensions
  class BatteryPercentage < DeviceComprehensions::Numeric
    def self.unit_string
      "%"
    end
  end
end
