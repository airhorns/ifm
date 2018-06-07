# frozen_string_literal: true
module Types
  class QueryType < BaseObject
    field :all_device_discovery_logs, [DeviceDiscoveryLogType], null: true, description: "List DeviceDiscoveryLogs" do
      argument :dismissed, Boolean, default_value: false, required: false
    end

    def all_device_discovery_logs(dismissed:)
      if dismissed
        DeviceDiscoveryLog.dismissed
      else
        DeviceDiscoveryLog.pending
      end
    end
  end
end
