class CreateDeviceControllerConfigurations < ActiveRecord::Migration[5.2]
  def change
    create_table :device_controller_configurations do |t|
      t.bigint :farm_id, null: false
      t.bigint :device_configuration_id, null: false
      t.string :device_controller_field, null: false
      t.string :human_name, null: false

      t.timestamps
    end
  end
end
