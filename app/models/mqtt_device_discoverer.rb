# frozen_string_literal: true

class MqttDeviceDiscoverer
  DEVICES = [
    Devices::EspurnaSonoffBasic,
    Devices::EspurnaSonoffTh,
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

    discoveries = groups.map do |key, group|
      DEVICES.detect do |device_klass|
        if device_klass.discover(group)
          break device_klass
        end
      end
    end.compact
  end

  def parse_topic_group_and_key(topic_string)
    segments = topic_string.split('/')
    [segments[0...-1].join('/'), segments[-1]]
  end
end
