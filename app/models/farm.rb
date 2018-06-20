# frozen_string_literal: true

class Farm < ApplicationRecord
  validates :name, presence: true

  has_many :device_discovery_logs
  has_many :mqtt_topic_states
  has_many :device_configurations
  has_many :device_controller_configurations
  has_many :farm_zones, validate: true, autosave: true

  def mqtt_client
    raise "MQTT connections in test are disabled for performance and stability" if Rails.env.test?
    @mqtt_client ||= MQTT::Client.connect(ENV.fetch('MQTT_URL'))
  end
end
