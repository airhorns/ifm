# frozen_string_literal: true

class DeviceConfiguration < ApplicationRecord
  validates :data_address, presence: true, uniqueness: { scope: :farm_id }
  validates :human_name, presence: true
  validates :farm_zone_id, presence: true
  validate :device_controller_configurations_match_device_controllers

  belongs_to :farm
  belongs_to :farm_zone
  has_many :device_controller_configurations, validate: true
  has_one :device_discovery_log

  def device_instance
    @device_instance ||= device_class.constantize.new(farm, self)
  end

  private

  def device_controller_configurations_match_device_controllers
    device_keys = device_instance.controllers.keys(&:to_s)
    configured_keys = device_controller_configurations.map(&:device_controller_field)
    unless device_keys.sort == configured_keys.sort
      errors.add(:device_controller_configurations, "must have a configuration for all controller fields on the device. Missing: #{device_keys - configured_keys}")
    end
  end
end
