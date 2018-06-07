# frozen_string_literal: true

class DeviceDiscoveryLog < ApplicationRecord
  validates :device_class, presence: true
  validates :last_seen, presence: true
  belongs_to :farm

  scope :dismissed, -> { where.not(dismissed_at: nil) }
  scope :pending, -> { where(dismissed_at: nil) }
end
