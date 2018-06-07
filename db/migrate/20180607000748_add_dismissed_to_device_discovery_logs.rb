# frozen_string_literal: true

class AddDismissedToDeviceDiscoveryLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :device_discovery_logs, :dismissed_at, :timestamp
  end
end
