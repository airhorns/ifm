# frozen_string_literal: true

class DeviceControllerStatePublish
  include Sidekiq::Worker
  # include TooLoudInDevelopment

  sidekiq_options retries: 0

  def perform(farm_id)
    farm = Farm.find(farm_id)
    device_controller_configurations = farm.device_controller_configurations.includes(:device_configuration).all
    device_controller_configurations.each do |controller_configuration|
      controller_configuration.controller.publish_state
    end
  end
end
