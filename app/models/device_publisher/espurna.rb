# frozen_string_literal: true

module DevicePublisher
  class Espurna < Base
    def initialize(*args)
      super
      @mqtt_key = field.to_s
    end

    def get
      if state = mqtt_state_for(@mqtt_key)
        comprehend(state.contents)
      end
    end
  end
end
