# frozen_string_literal: true

class ChangeMacAddressToDataAddressOnDeviceConfigurations < ActiveRecord::Migration[5.2]
  def change
    remove_column :device_configurations, :mac_address
    add_column :device_configurations, :data_address, :string, null: false
  end
end
