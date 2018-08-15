# frozen_string_literal: true
require 'uri'

class Farm < ApplicationRecord
  validates :name, presence: true

  has_many :device_discovery_logs
  has_many :mqtt_topic_states
  has_many :device_configurations
  has_many :device_controller_configurations
  has_many :farm_zones, validate: true, autosave: true
  has_many :controller_state_transitions
  has_many :grow_plans
  has_many :grow_plan_environments
  has_many :grow_plan_actions

  def mqtt_client
    raise "MQTT connections in test are disabled for performance and stability" if Rails.env.test?
    @mqtt_client ||= MqttClientFactory.client_for_url(ENV.fetch('MQTT_URL'))
  end
end
