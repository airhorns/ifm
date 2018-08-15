# frozen_string_literal: true

class CreateGrowPlanActions < ActiveRecord::Migration[5.2]
  def change
    create_table :grow_plan_actions do |t|
      t.bigint :farm_id, null: false
      t.bigint :grow_plan_id, null: false

      t.string :action_type, null: false
      t.integer :occurs_at_hours, null: false

      t.timestamps
    end
  end
end
