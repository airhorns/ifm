# frozen_string_literal: true

class AddUniqueIndexToDeviceConfigurations < ActiveRecord::Migration[5.2]
  def change
    add_index :device_configurations, [:farm_id, :mac_address], unique: true
  end
end
