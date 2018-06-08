# frozen_string_literal: true

class CreateFarmZones < ActiveRecord::Migration[5.2]
  def change
    create_table :farm_zones do |t|
      t.bigint :farm_id, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end
