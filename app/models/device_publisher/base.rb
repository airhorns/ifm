# frozen_string_literal: true

module DevicePublisher
  class Base
    attr_reader :device, :field, :comprehension, :config

    def initialize(device, field:, comprehension:, config: {})
      @device = device
      @field = field
      @comprehension = comprehension
      @config = config
    end

    def human_name
      case @field
      when :rssi, :vcc, :ip
        @field.to_s.upcase
      when :loadavg
        "Load Average"
      when :mac, :mac_address
        "MAC Address"
      else
        @field.to_s.humanize
      end
    end

    def comprehend(raw_value)
      comprehension.comprehend(raw_value)
    end

    def tags
      @tags ||= {}.merge(@device.tags)
    end

    def publish(raw_value)
      rich_value = comprehend(raw_value)
      series = comprehension.series_name
      Ifm::Application.influxdb.write_point(series, values: { value: rich_value }, tags: tags)
    end
  end
end
