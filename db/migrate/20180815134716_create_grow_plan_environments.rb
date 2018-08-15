# frozen_string_literal: true

class CreateGrowPlanEnvironments < ActiveRecord::Migration[5.2]
  def change
    create_table :grow_plan_environments do |t|
      t.bigint :farm_id, null: false
      t.bigint :grow_plan_id, null: false
      t.integer :starts_at_hours, null: false
      t.string :environment_type, null: false
      t.float :minimum_ec
      t.float :maximum_ec
      t.float :minimum_ph
      t.float :maximum_ph
      t.float :minimum_hours_light, null: false
      t.float :maximum_hours_light, null: false
      t.float :minimum_temperature, null: false
      t.float :maximum_temperature, null: false
      t.timestamps
    end
  end
end
