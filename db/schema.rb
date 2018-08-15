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

ActiveRecord::Schema.define(version: 2018_08_15_144241) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "controller_state_transitions", force: :cascade do |t|
    t.string "to_state", null: false
    t.string "initiator", null: false
    t.datetime "confirmed_at"
    t.bigint "device_controller_configuration_id", null: false
    t.bigint "farm_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

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

  create_table "device_controller_configurations", force: :cascade do |t|
    t.bigint "farm_id", null: false
    t.bigint "device_configuration_id", null: false
    t.string "field", null: false
    t.string "nickname", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "enabled", default: true, null: false
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

  create_table "grow_plan_actions", force: :cascade do |t|
    t.bigint "farm_id", null: false
    t.bigint "grow_plan_id", null: false
    t.string "action_type", null: false
    t.integer "occurs_at_hours", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "grow_plan_environments", force: :cascade do |t|
    t.bigint "farm_id", null: false
    t.bigint "grow_plan_id", null: false
    t.integer "starts_at_hours", null: false
    t.string "environment_type", null: false
    t.float "minimum_ec"
    t.float "maximum_ec"
    t.float "minimum_ph"
    t.float "maximum_ph"
    t.float "minimum_hours_light", null: false
    t.float "maximum_hours_light", null: false
    t.float "minimum_temperature", null: false
    t.float "maximum_temperature", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "grow_plans", force: :cascade do |t|
    t.bigint "farm_id", null: false
    t.string "name", null: false
    t.string "category", null: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_grow_plans_on_name", unique: true
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

  create_table "scheduled_control_states", force: :cascade do |t|
    t.bigint "farm_id", null: false
    t.bigint "schedule_id", null: false
    t.bigint "device_controller_configuration_id", null: false
    t.string "recurrence", null: false
    t.string "desired_state", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "schedules", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "farm_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "enabled", default: true, null: false
  end

end
