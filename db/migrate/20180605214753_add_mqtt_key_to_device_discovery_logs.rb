# frozen_string_literal: true

class AddMqttKeyToDeviceDiscoveryLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :device_discovery_logs, :mqtt_key, :string
    add_column :device_discovery_logs, :device_class, :string, null: false
    add_index :device_discovery_logs, :mqtt_key
    remove_column :device_discovery_logs, :mac_address
  end
end
