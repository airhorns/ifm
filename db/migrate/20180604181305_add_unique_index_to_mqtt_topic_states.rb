# frozen_string_literal: true

class AddUniqueIndexToMqttTopicStates < ActiveRecord::Migration[5.2]
  def change
    add_index :mqtt_topic_states, [:farm_id, :topic], unique: true
  end
end
