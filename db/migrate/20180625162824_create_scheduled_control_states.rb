# frozen_string_literal: true

class CreateScheduledControlStates < ActiveRecord::Migration[5.2]
  def change
    create_table :scheduled_control_states do |t|
      t.bigint :farm_id, null: false
      t.bigint :schedule_id, null: false
      t.bigint :device_controller_configuration_id, null: false
      t.string :recurrence, null: false
      t.string :desired_state, null: false

      t.timestamps
    end
  end
end
