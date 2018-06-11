# frozen_string_literal: true
require 'set'

class MqttDevicePublicationInjester
  attr_reader :farm, :topic_patterns

  def initialize(farm)
    @farm = farm
    @topic_map = {}
    @topic_subscriptions = Set.new

    @farm.device_configurations.each do |device_configuration|
      device_configuration.device_instance.publishers.values.each do |publisher|
        @topic_map[publisher.absolute_mqtt_topic] = publisher
        @topic_subscriptions << publisher.mqtt_topic_pattern
      end
    end
  end

  def subscribe
    @farm.mqtt_client.subscribe(*@topic_subscriptions.to_a.sort)
  end

  def injest_one
    topic, message = @farm.mqtt_client.get
    if publisher = @topic_map[topic]
      publisher.publish(message)
    else
      Rails.logger.error("Unknown topic for publication injestor: #{topic} with message #{message}")
    end
  end

  private

  def parse_topic_group_and_key(topic_string)
    segments = topic_string.split('/')
    [segments[0..1].join('/'), segments[2..-1].join('/')]
  end
end
