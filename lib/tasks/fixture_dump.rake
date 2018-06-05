# frozen_string_literal: true

namespace :fixture_dump do
  desc "Dump fixture YML from development database to STDOUT"
  task :mqtt_topic_state, [:pattern] => :environment do |_task, args|
    blobs = MqttTopicState.where("topic LIKE ?", args[:pattern]).all.map do |topic_state|
      {
        "farm" => "bct",
        "topic" => topic_state.topic,
        "contents" => topic_state.contents
      }
    end
    puts blobs.index_by { |hash| hash["topic"] }.to_yaml
  end
end
