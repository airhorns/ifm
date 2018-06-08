# frozen_string_literal: true
module Types
  class ProposedDeviceConfigurationType < BaseObject
    field :publications, [Types::DevicePublicationType], null: false
    field :controller, [Types::DeviceControllerType], null: false
  end
end
