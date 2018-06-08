# frozen_string_literal: true
module Types
  class QueryType < BaseObject
    field :device_discovery_logs, [DeviceDiscoveryLogType], null: true do
      description "List DeviceDiscoveryLogs with scope arguments"
      argument :dismissed, Boolean, default_value: false, required: false
    end

    field :device_discovery_log, DeviceDiscoveryLogType, null: true do
      description "Get one DeviceDiscoveryLog"
      argument :id, ID, required: true
    end

    field :farm_zones, [FarmZoneType], null: true do
      description "Get the list of zones for the current farm"
    end

    field :farm, FarmType, null: true do
      description "Get the details of the current farm"
    end

    def device_discovery_logs(dismissed:)
      scope = context[:current_farm].device_discovery_logs
      if dismissed
        scope.dismissed
      else
        scope.pending
      end
    end

    def device_discovery_log(id:)
      context[:current_farm].device_discovery_logs.find(strip_id(id))
    end

    def farm_zones
      context[:current_farm].farm_zones
    end

    def farm
      context[:current_farm]
    end

    private

    def strip_id(id)
      id.split('-', 2)[-1]
    end
  end
end
