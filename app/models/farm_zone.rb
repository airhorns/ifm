# frozen_string_literal: true

class FarmZone < ApplicationRecord
  validates :name, presence: true
  belongs_to :farm
  has_many :device_configurations
end
