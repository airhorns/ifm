class AddUniqueIndexToDeviceDiscoveryLogs < ActiveRecord::Migration[5.2]
  def change
    remove_index :device_discovery_logs, :mqtt_key
    add_index :device_discovery_logs, [:farm_id, :mqtt_key], unique: true
  end
end
