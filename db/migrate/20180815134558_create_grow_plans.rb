# frozen_string_literal: true

class CreateGrowPlans < ActiveRecord::Migration[5.2]
  def change
    create_table :grow_plans do |t|
      t.bigint :farm_id, null: false
      t.string :name, null: false
      t.string :category, null: false
      t.text :notes

      t.timestamps

      t.index :name, unique: true
    end
  end
end
