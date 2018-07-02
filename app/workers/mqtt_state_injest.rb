# frozen_string_literal: true

class MqttStateInjest
  include Sidekiq::Worker
  include SidekiqDaemon::Worker
  prepend TooLoudInDevelopment

  sidekiq_options retries: 0

  SUBSCRIPTION_PATTERNS = ['#']

  def perform(farm_id)
    client = Farm.find(farm_id).mqtt_client
    client.subscribe(*SUBSCRIPTION_PATTERNS.map { |topic| [topic, 2] })
    client.on_message do |packet|
      topic = packet.topic
      payload = MqttHelper.sanitize_payload(packet.payload)
      if existing_state = get_state(farm_id, topic)
        existing_state.contents = payload
        existing_state.save!
      else
        MqttTopicState.create!(farm_id: farm_id, topic: topic, contents: payload)
      end
    end

    loop do
      client.mqtt_loop
      break unless daemon_lock.checkin
    end
  end

  def get_state(farm_id, topic)
    @cache ||= {}
    @cache[topic] ||= MqttTopicState.where(farm_id: farm_id, topic: topic).first || :nil
    if @cache[topic] == :nil
      nil
    else
      @cache[topic]
    end
  end
end
