# frozen_string_literal: true
require 'set'

class MqttDeviceControllerStateInjester
  attr_reader :farm, :topic_patterns, :controller_state_manager

  def initialize(farm)
    @farm = farm
    @controller_state_manager = ControllerStateManager.new(farm, "Device State Injestor Background Task")
    @topic_map = {}
    @topic_subscriptions = Set.new

    @farm.device_configurations.each do |device_configuration|
      device_configuration.device_instance.controllers.values.each do |controller|
        if controller.mqtt?
          @topic_map[controller.absolute_mqtt_topic] = controller
          @topic_subscriptions << controller.mqtt_topic_pattern
        else
          raise "Can't work with non-mqtt device type"
        end
      end
    end
  end

  def subscribe
    if !@topic_subscriptions.empty?
      @farm.mqtt_client.subscribe(*@topic_subscriptions.to_a.sort.map { |topic| [topic, 2] })
      @farm.mqtt_client.on_message { |packet| process_packet(packet) }
      true
    else
      false
    end
  end

  def loop
    @farm.mqtt_client.mqtt_loop
  end

  def process_packet(packet)
    topic = packet.topic
    message = packet.payload
    if controller = @topic_map[topic]
      rich_message = controller.interpret_message(topic, message)
      @controller_state_manager.update_transitions(controller.device_controller_configuration, rich_message)
    else
      Rails.logger.debug("Unknown topic for controller state injestor: #{topic} with message #{message}")
    end
  end

  private

  def parse_topic_group_and_key(topic_string)
    segments = topic_string.split('/')
    [segments[0..1].join('/'), segments[2..-1].join('/')]
  end
end
