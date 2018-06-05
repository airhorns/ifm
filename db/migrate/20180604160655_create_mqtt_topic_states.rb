# frozen_string_literal: true

class CreateMqttTopicStates < ActiveRecord::Migration[5.2]
  def change
    create_table :mqtt_topic_states do |t|
      t.references :farm, null: false
      t.string :topic, null: false
      t.string :contents, null: false

      t.timestamps
    end
  end
end
