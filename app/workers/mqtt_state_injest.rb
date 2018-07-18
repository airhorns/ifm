# frozen_string_literal: true

class MqttStateInjest
  include Sidekiq::Worker
  include SidekiqDaemon::Worker
  prepend TooLoudInDevelopment

  sidekiq_options retries: 0, daemon_lock_duration: 30

  SUBSCRIPTION_PATTERNS = ['#']

  def perform(farm_id)
    client = Farm.find(farm_id).mqtt_client
    client.subscribe(*SUBSCRIPTION_PATTERNS.map { |topic| [topic, 2] })

    batch = []
    client.on_message do |packet|
      batch << packet
    end

    loop do
      client.mqtt_loop
      process_batch(farm_id, batch)
      batch = []
      break unless daemon_lock.checkin
    end
  end

  def process_batch(farm_id, batch)
    batch.each do |packet|
      topic = packet.topic
      payload = MqttHelper.sanitize_payload(packet.payload)

      if existing_state = get_state(farm_id, topic)
        existing_state.contents = payload
        existing_state.save!
      else
        @cache[topic] = MqttTopicState.create!(farm_id: farm_id, topic: topic, contents: payload)
      end
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
