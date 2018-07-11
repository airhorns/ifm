# frozen_string_literal: true

class DeviceControllerStateInstrumentationPublish
  include Sidekiq::Worker
  include TooLoudInDevelopment

  sidekiq_options retries: 0

  def perform(farm_id)
    farm = Farm.find(farm_id)
    device_controller_configurations = farm.device_controller_configurations.includes(:device_configuration).all
    device_controller_configurations.each do |controller_configuration|
      controller = controller_configuration.controller

      numeric_state = case controller.current_state
      when :on then 1
      when :off then 0
      when :unknown then -1
      else -1
      end

      Ifm::Application.influxdb.write_point(
        "controller_state",
        values: {
          state: controller.current_state.to_s,
          numeric_state: numeric_state
        },
        tags: controller.tags
      )
    end
  end
end
