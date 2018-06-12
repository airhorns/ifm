# frozen_string_literal: true

class DeviceControllerConfiguration < ApplicationRecord
  validates :human_name, presence: true
  belongs_to :farm
  belongs_to :device_configuration
end
