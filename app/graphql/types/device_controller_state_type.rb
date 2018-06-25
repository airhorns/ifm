# frozen_string_literal: true

module Types
  class DeviceControllerStateType < BaseEnum
    value "off", "Turned off"
    value "on", "Turned on"
    value "unknown", "When there was an error getting the state"
  end
end
