# frozen_string_literal: true

class RenameDeviceControllerConfigurationsDeviceControllerFieldToField < ActiveRecord::Migration[5.2]
  def change
    rename_column :device_controller_configurations, :device_controller_field, :field
  end
end
