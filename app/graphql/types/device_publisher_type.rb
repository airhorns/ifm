# frozen_string_literal: true
module Types
  class DevicePublisherType < BaseObject
    field :field, String, null: false
    field :human_name, String, null: false
    field :human_value, String, null: false
    field :comprehension_human_name, String, null: false
    field :comprehension_unit, String, null: true
    field :icon, String, null: false

    def human_value
      if value = object.cached_value
        object.comprehension.format(value)
      else
        "unknown"
      end
    end

    def comprehension_human_name
      object.comprehension.human_name
    end

    def comprehension_unit
      object.comprehension.unit_string
    end

    def icon
      case object.comprehension.name
      when "DeviceComprehensions::Temperature"
        "thermometer half"
      when "DeviceComprehensions::Humidity"
        "tint"
      when "DeviceComprehensions::MacAddress", "DeviceComprehensions::IpAddress"
        "sitemap"
      when "DeviceComprehensions::BatteryPercentage"
        "battery full"
      when "DeviceComprehensions::Voltage", "DeviceComprehensions::Power", "DeviceComprehensions::Current"
        "bolt"
      else
        "cube"
      end
    end
  end
end
