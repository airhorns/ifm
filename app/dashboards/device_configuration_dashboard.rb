# frozen_string_literal: true

require "administrate/base_dashboard"

class DeviceConfigurationDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    farm: Field::BelongsTo,
    id: Field::Number,
    mac_address: Field::String,
    human_name: Field::String,
    config: Field::String.with_options(searchable: false),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :farm,
    :id,
    :mac_address,
    :human_name,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :farm,
    :id,
    :mac_address,
    :human_name,
    :config,
    :created_at,
    :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :farm,
    :mac_address,
    :human_name,
    :config,
  ].freeze

  # Overwrite this method to customize how device configurations are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(device_configuration)
  #   "DeviceConfiguration ##{device_configuration.id}"
  # end
end
