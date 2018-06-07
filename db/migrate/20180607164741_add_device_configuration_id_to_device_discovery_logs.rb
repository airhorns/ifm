# frozen_string_literal: true

class AddDeviceConfigurationIdToDeviceDiscoveryLogs < ActiveRecord::Migration[5.2]
  def change
    add_column :device_discovery_logs, :device_configuration_id, :bigint
  end
end
