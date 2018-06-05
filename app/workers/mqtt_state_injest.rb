# frozen_string_literal: true

class MqttStateInjest
  include Sidekiq::Worker
  include SidekiqDaemon::Worker
  sidekiq_options retries: 0

  SUBSCRIPTION_PATTERNS = ['#']

  def perform(farm_id)
    client = Farm.find(farm_id).mqtt_client
    client.subscribe(*SUBSCRIPTION_PATTERNS)
    client.get do |topic, payload|
      payload = MqttHelper.sanitize_payload(payload)
      if existing_state = MqttTopicState.where(farm_id: farm_id, topic: topic).first
        existing_state.contents = payload
        existing_state.save!
      else
        MqttTopicState.create!(farm_id: farm_id, topic: topic, contents: payload)
      end

      daemon_lock.renew
    end
  end
end
