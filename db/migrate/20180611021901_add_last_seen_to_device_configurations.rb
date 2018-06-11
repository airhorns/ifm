class AddLastSeenToDeviceConfigurations < ActiveRecord::Migration[5.2]
  def change
    add_column :device_configurations, :last_seen, :timestamp, null: false
  end
end
