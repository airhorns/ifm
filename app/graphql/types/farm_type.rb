# frozen_string_literal: true

module Types
  class FarmType < BaseObject
    field :name, String, null: false
    field :dashboard_host, String, null: false
    field :farm_zones, [FarmZoneType], null: false

    def dashboard_host
      if Rails.env.production?
        "https://chronograf.app.bigclear.farm/sources/0/dashboards"
      else
        "http://localhost:8888/sources/0/dashboards"
      end
    end
  end
end
