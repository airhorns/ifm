# frozen_string_literal: true

module DeviceComprehensions
  class Base
    def self.comprehend(value)
      value
    end

    def self.unit_string
      nil
    end

    def self.human_name
      name.split("::")[-1].titleize
    end
  end
end
