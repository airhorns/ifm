# frozen_string_literal: true

class DeviceDiscoveryLog < ApplicationRecord
  validates :mac_address, presence: true
  belongs_to :farm
end
