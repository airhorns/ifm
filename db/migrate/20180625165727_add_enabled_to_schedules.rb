class AddEnabledToSchedules < ActiveRecord::Migration[5.2]
  def change
    add_column :schedules, :enabled, :boolean, null: false, default: true
  end
end
