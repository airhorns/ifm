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

    def static?
      false
    end

    def mqtt?
      false
    end

    def cached_value
      raise NotImplementedError
    end

    def comprehend(raw_value)
      comprehension.comprehend(raw_value)
    rescue ArgumentError
      Rails.logger.warn "uncomprehensible raw_value=#{raw_value} field=#{field}"
      nil
    end

    def tags
      @tags ||= {}.merge(@device.tags)
    end

    def publish(raw_value)
      rich_value = comprehend(raw_value)
      unless rich_value.nil?
        series = comprehension.series_name
        Ifm::Application.influxdb.write_point(series, values: { value: rich_value }, tags: tags)
      end
    end
  end
end
