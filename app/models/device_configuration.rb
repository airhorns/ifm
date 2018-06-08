# frozen_string_literal: true

class DeviceConfiguration < ApplicationRecord
  validates :data_address, presence: true, uniqueness: { scope: :farm_id }
  validates :human_name, presence: true

  belongs_to :farm

  def device_instance
    config = (config || {}).clone
    if data_address.start_with?('mqtt')
      config["mqtt_key"] = data_address.sub("mqtt://", '')
    end
    device_class.constantize.new(farm, config)
  end
end
