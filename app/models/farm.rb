# frozen_string_literal: true

class Farm < ApplicationRecord
  validates :name, presence: true

  def mqtt_client
    MQTT::Client.connect(ENV.fetch('MQTT_URL'))
  end
end
