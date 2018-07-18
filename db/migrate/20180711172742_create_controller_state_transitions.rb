# frozen_string_literal: true

class CreateControllerStateTransitions < ActiveRecord::Migration[5.2]
  def change
    create_table :controller_state_transitions do |t|
      t.string :to_state, null: false
      t.string :initiator, null: false
      t.datetime :confirmed_at
      t.bigint :device_controller_configuration_id, null: false
      t.bigint :farm_id, null: false

      t.timestamps
    end
  end
end
