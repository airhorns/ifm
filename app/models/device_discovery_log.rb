# frozen_string_literal: true

class DeviceDiscoveryLog < ApplicationRecord
  validates :device_class, presence: true
  validates :last_seen, presence: true
  belongs_to :farm
  belongs_to :device_configuration

  scope :dismissed, -> { where.not(dismissed_at: nil) }
  scope :pending, -> { where(dismissed_at: nil) }

  def data_address
    "mqtt://#{mqtt_key}"
  end
end
