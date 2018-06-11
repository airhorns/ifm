# frozen_string_literal: true

class DeviceConfiguration < ApplicationRecord
  validates :data_address, presence: true, uniqueness: { scope: :farm_id }
  validates :human_name, presence: true
  validates :farm_zone_id, presence: true

  belongs_to :farm
  belongs_to :farm_zone
  has_one :device_discovery_log

  def device_instance
    @device_instance ||= device_class.constantize.new(farm, self)
  end
end
