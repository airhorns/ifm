# frozen_string_literal: true

class CreateDeviceDiscoveryLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :device_discovery_logs do |t|
      t.bigint :farm_id, null: false
      t.string :mac_address, null: false
      t.timestamp :last_seen, null: false
      t.json :data

      t.timestamps
    end
  end
end
