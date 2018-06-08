# frozen_string_literal: true
module Types
  class ProposedDeviceConfigurationType < BaseObject
    field :config, Types::JsonType, null: false
    field :publishers, [Types::DevicePublisherType], null: false
    field :controllers, [Types::DeviceControllerType], null: false

    def config
      object.config || {}
    end

    def publishers
      object.device_instance.publishers.values
    end

    def controllers
      object.device_instance.controllers.values
    end
  end
end
