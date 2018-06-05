# frozen_string_literal: true

class MqttTopicState < ApplicationRecord
  validates :topic, presence: true, uniqueness: { scope: :farm_id }
  belongs_to :farm
end
