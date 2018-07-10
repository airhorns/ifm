# frozen_string_literal: true

namespace :mqtt do
  desc "Dump fixture YML from development database to STDOUT"
  task :fixture_dump, [:pattern] => :environment do |_task, args|
    blobs = MqttTopicState.where("topic LIKE ?", args[:pattern]).all.map do |topic_state|
      {
        "farm" => "bct",
        "topic" => topic_state.topic,
        "contents" => topic_state.contents
      }
    end
    puts blobs.index_by { |hash| hash["topic"] }.to_yaml
  end

  desc "Dump contents of production MQTT bus onto local bus"
  task :mirror_production, [:pattern] => :environment do |_task, args|
    puts "Mirroring production MQTT to #{ENV['MQTT_URL']}... connecting ..."
    production = MqttClientFactory.client_for_url(ENV.fetch('PRODUCTION_MQTT_URL'))
    local = MqttClientFactory.client_for_url(ENV.fetch('MQTT_URL'))
    puts "MQTT clients connected."

    messages = 0
    production.subscribe([args[:pattern], 2])
    production.on_message do |packet|
      messages += 1
      if (messages % 500) == 0
        puts "Forwarded #{messages} messages"
      end
      local.publish(packet.topic, packet.payload, true, 1)
    end

    loop do
      production.mqtt_loop
      local.mqtt_loop
    end
  end
end
