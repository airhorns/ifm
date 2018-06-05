# frozen_string_literal: true

class CreateDeviceConfigurations < ActiveRecord::Migration[5.2]
  def change
    create_table :device_configurations do |t|
      t.references :farm, null: false
      t.string :mac_address, null: false
      t.string :human_name
      t.json :config

      t.timestamps
    end
  end
end
