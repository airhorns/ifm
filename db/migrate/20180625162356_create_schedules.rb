# frozen_string_literal: true

class CreateSchedules < ActiveRecord::Migration[5.2]
  def change
    create_table :schedules do |t|
      t.string :name, null: false
      t.bigint :farm_id, null: false

      t.timestamps
    end
  end
end
