# frozen_string_literal: true
require 'set'

class StaticDevicePublicationInjester
  attr_reader :farm

  def initialize(farm)
    @farm = farm
  end

  def subscribe
    @farm.mqtt_client.subscribe(*@topic_subscriptions.to_a.sort)
  end

  def injest_all
    @farm.device_configurations.each do |device_configuration|
      device_configuration.device_instance.publishers.values.each do |publisher|
        if publisher.static?
          publisher.publish(publisher.get)
        end
      end
    end
  end
end
