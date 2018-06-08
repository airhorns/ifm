# frozen_string_literal: true
module Types
  class QueryType < BaseObject
    field :all_device_discovery_logs, [DeviceDiscoveryLogType], null: true do
      description "List DeviceDiscoveryLogs with scope arguments"
      argument :dismissed, Boolean, default_value: false, required: false
    end

    field :device_discovery_log, DeviceDiscoveryLogType, null: true do
      description "Get one DeviceDiscoveryLog"
      argument :id, ID, required: true
    end

    def all_device_discovery_logs(dismissed:)
      if dismissed
        DeviceDiscoveryLog.dismissed
      else
        DeviceDiscoveryLog.pending
      end
    end

    def device_discovery_log(id:)
      DeviceDiscoveryLog.find(strip_id(id))
    end

    private

    def strip_id(id)
      id.split('-', 2)[-1]
    end
  end
end
