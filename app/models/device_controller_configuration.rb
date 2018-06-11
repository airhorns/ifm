class DeviceControllerConfiguration < ApplicationRecord
  belongs_to :farm
  belongs_to :device_configuration
end
