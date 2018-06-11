# frozen_string_literal: true

class AddFarmZoneIdToDeviceConfigurations < ActiveRecord::Migration[5.2]
  def change
    add_column :device_configurations, :farm_zone_id, :bigint, null: false
  end
end
