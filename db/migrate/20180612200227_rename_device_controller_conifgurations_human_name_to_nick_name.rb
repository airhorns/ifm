class RenameDeviceControllerConifgurationsHumanNameToNickName < ActiveRecord::Migration[5.2]
  def change
    rename_column :device_controller_configurations, :human_name, :nickname
  end
end
