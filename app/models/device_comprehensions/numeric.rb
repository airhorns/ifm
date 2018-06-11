# frozen_string_literal: true

module DeviceComprehensions
  class Numeric < Base
    def self.comprehend(value)
      Float(value)
    end

    def self.human_name
      if self == DeviceComprehensions::Numeric
        "Generic numeric"
      else
        super
      end
    end
  end
end
