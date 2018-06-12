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
    production = MQTT::Client.connect(ENV.fetch('PRODUCTION_MQTT_URL'))
    local = MQTT::Client.connect(ENV.fetch('MQTT_URL'))
    puts "MQTT clients connected."

    production.subscribe(args[:pattern])
    production.get do |topic, contents|
      puts "Mirror #{contents} to #{topic}"
      local.publish(topic, contents)
    end
  end
end
