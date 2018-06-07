# frozen_string_literal: true

require "administrate/base_dashboard"

class DeviceDiscoveryLogDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    farm: Field::BelongsTo,
    id: Field::Number,
    last_seen: Field::DateTime,
    data: Field::String.with_options(searchable: false),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    mqtt_key: Field::String,
    device_class: Field::String,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :farm,
    :id,
    :last_seen,
    :data,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :farm,
    :id,
    :last_seen,
    :data,
    :created_at,
    :updated_at,
    :mqtt_key,
    :device_class,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :farm,
    :last_seen,
    :data,
    :mqtt_key,
    :device_class,
  ].freeze

  # Overwrite this method to customize how device discovery logs are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(device_discovery_log)
  #   "DeviceDiscoveryLog ##{device_discovery_log.id}"
  # end
end
