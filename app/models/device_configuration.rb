# frozen_string_literal: true

class DeviceConfiguration < ApplicationRecord
  validates :mac_address, presence: true, uniqueness: { scope: :farm_id }
  validates :human_name, presence: true

  belongs_to :farm
end
