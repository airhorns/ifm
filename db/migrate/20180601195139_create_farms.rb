# frozen_string_literal: true

class CreateFarms < ActiveRecord::Migration[5.2]
  def change
    create_table :farms do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
