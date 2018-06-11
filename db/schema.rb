# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_06_11_021901) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "device_configurations", force: :cascade do |t|
    t.bigint "farm_id", null: false
    t.string "human_name"
    t.json "config"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "device_class", null: false
    t.string "data_address", null: false
    t.bigint "farm_zone_id", null: false
    t.datetime "last_seen", null: false
    t.index ["farm_id"], name: "index_device_configurations_on_farm_id"
  end

  create_table "device_discovery_logs", force: :cascade do |t|
    t.bigint "farm_id", null: false
    t.datetime "last_seen", null: false
    t.json "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "mqtt_key"
    t.string "device_class", null: false
    t.datetime "dismissed_at"
    t.bigint "device_configuration_id"
    t.index ["farm_id", "mqtt_key"], name: "index_device_discovery_logs_on_farm_id_and_mqtt_key", unique: true
  end

  create_table "farm_zones", force: :cascade do |t|
    t.bigint "farm_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "farms", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mqtt_topic_states", force: :cascade do |t|
    t.bigint "farm_id", null: false
    t.string "topic", null: false
    t.string "contents", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["farm_id", "topic"], name: "index_mqtt_topic_states_on_farm_id_and_topic", unique: true
    t.index ["farm_id"], name: "index_mqtt_topic_states_on_farm_id"
  end

end
