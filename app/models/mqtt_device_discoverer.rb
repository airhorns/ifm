# frozen_string_literal: true

class MqttDeviceDiscoverer
  EPOCH = "30/Nov/2009 16:29:30 +0100".to_datetime

  DEVICES = [
    Devices::EspurnaSonoffBasic,
    Devices::EspurnaSonoffTh,
    Devices::EspurnaSonoffPowR2,
    Devices::EspurnaSonoffS31,
    Devices::MinewS1,
    Devices::XiaomiBleHt,
    Devices::Skybeacon
  ]

  attr_reader :farm

  def initialize(farm)
    @farm = farm
  end

  def discover_and_save!
    discoveries[:discoveries].each do |_sensor_key, attribute_hash|
      discovery = DeviceDiscoveryLog.includes(device_configuration: :device_controller_configurations).find_or_initialize_by(farm_id: farm.id, mqtt_key: attribute_hash[:mqtt_key])
      discovery.assign_attributes(attribute_hash)
      if discovery.device_configuration
        discovery.device_configuration.last_seen = discovery.last_seen
        discovery.device_configuration.save!
      end
      discovery.save!
    end
  end

  def discoveries
    attributes = MqttTopicState.where(farm_id: @farm.id).find_in_batches.each_with_object({}) do |batch, attribute_hashes|
      batch.each do |topic_state|
        sensor_key, data_key = parse_topic_group_and_key(topic_state.topic)
        attribute_hashes[sensor_key] ||= { data: {}, last_seen: EPOCH, mqtt_key: sensor_key }
        attribute_hashes[sensor_key][:data][data_key] = topic_state.contents
        attribute_hashes[sensor_key][:last_seen] = topic_state.updated_at if topic_state.updated_at > attribute_hashes[sensor_key][:last_seen]
      end
    end

    attributes.each_with_object(discoveries: {}, unknown: {}) do |(sensor_key, attribute_hash), result|
      if device_class = DEVICES.detect { |klass| klass.discover(attribute_hash[:data]) }
        attribute_hash[:device_class] = device_class
        result[:discoveries][sensor_key] = attribute_hash
      else
        result[:unknown][sensor_key] = attribute_hash
      end
    end
  end

  private

  def parse_topic_group_and_key(topic_string)
    segments = topic_string.split('/')
    [segments[0..1].join('/'), segments[2..-1].join('/')]
  end
end
