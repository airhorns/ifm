# frozen_string_literal: true

class MqttDeviceDiscoverer
  DEVICES = [
    Devices::EspurnaSonoffBasic,
    Devices::EspurnaSonoffTh,
    Devices::EspurnaSonoffPowR2,
    Devices::MinewS1,
    Devices::XiaomiBleHt
  ]

  attr_reader :farm

  def initialize(farm)
    @farm = farm
  end

  def discoveries
    groups = MqttTopicState.where(farm_id: @farm.id).find_in_batches.each_with_object({}) do |batch, states|
      batch.each do |topic_state|
        group, key = parse_topic_group_and_key(topic_state.topic)
        states[group] ||= {}
        states[group][key] = topic_state.contents
      end
    end

    groups.each_with_object({}) do |(key, group), discoveries|
      DEVICES.detect do |device_klass|
        if device_klass.discover(group)
          discoveries[key] = [device_klass, group]
        end
      end
    end
  end

  def parse_topic_group_and_key(topic_string)
    segments = topic_string.split('/')
    [segments[0..1].join('/'), segments[2..-1].join('/')]
  end
end
