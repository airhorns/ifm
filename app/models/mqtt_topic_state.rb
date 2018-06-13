# frozen_string_literal: true

class MqttTopicState < ApplicationRecord
  validates :topic, presence: true # uniqueness validated by the database
  belongs_to :farm
end
