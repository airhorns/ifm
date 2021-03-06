# frozen_string_literal: true

class DeviceConfiguration < ApplicationRecord
  validates :data_address, presence: true, uniqueness: { scope: :farm_id }
  validates :human_name, presence: true
  validates :farm_zone_id, presence: true
  validate :device_controller_configurations_match_device_controllers

  belongs_to :farm
  belongs_to :farm_zone
  has_many :device_controller_configurations, validate: true, autosave: true
  has_many :mqtt_topic_states, ->(device_configuration) { unscope(:where).where('topic LIKE ?', "#{device_configuration.mqtt_topic_space}/%") }
  has_one :device_discovery_log, dependent: :nullify

  def device_instance
    @device_instance ||= device_class.constantize.new(farm, self)
  end

  def mqtt_topic_space
    @mqtt_key ||= if data_address.start_with?('mqtt')
      data_address.sub("mqtt://", '')
    else
      raise "Can't get MQTT key for non mqtt device"
    end
  end

  def mqtt_topic_state_for(absolute_topic)
    @topic_states_by_topic = mqtt_topic_states.index_by(&:topic)
    @topic_states_by_topic[absolute_topic]
  end

  private

  def device_controller_configurations_match_device_controllers
    device_keys = device_instance.controllers.keys.map(&:to_s)
    configured_keys = device_controller_configurations.map(&:field)
    unless device_keys.sort == configured_keys.sort
      errors.add(:device_controller_configurations, "must have a configuration for all controller fields on the device. Missing: #{device_keys - configured_keys}. Extra: #{configured_keys - device_keys}")
    end
  end
end
