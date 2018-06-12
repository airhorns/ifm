# frozen_string_literal: true

class AddEnabledToDeviceControllerConfigurations < ActiveRecord::Migration[5.2]
  def change
    add_column :device_controller_configurations, :enabled, :boolean, null: false, default: true
  end
end
