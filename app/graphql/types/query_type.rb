# frozen_string_literal: true
module Types
  class QueryType < BaseObject
    field :device_discovery_logs, [DeviceDiscoveryLogType], null: false do
      description "List DeviceDiscoveryLogs with scope arguments"
      argument :filter, Types::DiscoveryStateFilter, default_value: "PENDING", required: false
    end

    field :device_discovery_log, DeviceDiscoveryLogType, null: false do
      description "Get one DeviceDiscoveryLog"
      argument :id, ID, required: true
    end

    field :farm_zones, [FarmZoneType], null: false do
      description "Get the list of zones for the current farm"
    end

    field :farm, FarmType, null: false do
      description "Get the details of the current farm"
    end

    field :device_configurations, [DeviceConfigurationType], null: false do
      description "Get all the configured devices as DeviceConfiguration objects"
    end

    field :device_configuration, DeviceConfigurationType, null: false do
      description "Get the details of one DeviceConfiguration object"
      argument :id, ID, required: true
    end

    def device_discovery_logs(filter:)
      scope = context[:current_farm].device_discovery_logs
      case filter
      when "PENDING"
        scope.pending
      when "DISMISSED"
        scope.dismissed
      when "ENLISTED"
        scope.enlisted
      else
        raise "Unknown discovery log filter type"
      end
    end

    def device_discovery_log(id:)
      context[:current_farm].device_discovery_logs.find(id)
    end

    def device_configuration(id:)
      context[:current_farm].device_configurations.find(id)
    end

    def farm_zones
      context[:current_farm].farm_zones
    end

    def farm
      context[:current_farm]
    end

    def device_configurations
      context[:current_farm].device_configurations
    end

    private

    def strip_id(id)
      id.split('-', 2)[-1]
    end
  end
end
