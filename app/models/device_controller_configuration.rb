# frozen_string_literal: true

class DeviceControllerConfiguration < ApplicationRecord
  validates :nickname, presence: true
  belongs_to :farm
  belongs_to :device_configuration

  def controller
    device_configuration.device_instance.controllers[field.to_sym]
  end
end
