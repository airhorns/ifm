# frozen_string_literal: true

module MqttHelper
  def self.sanitize_payload(string)
    string.delete("\u0000")
  end
end
