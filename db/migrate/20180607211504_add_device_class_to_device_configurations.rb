# frozen_string_literal: true

class AddDeviceClassToDeviceConfigurations < ActiveRecord::Migration[5.2]
  def change
    add_column :device_configurations, :device_class, :string, null: false
  end
end
