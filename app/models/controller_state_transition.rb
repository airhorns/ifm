# frozen_string_literal: true

class ControllerStateTransition < ApplicationRecord
  validates :to_state, presence: true, inclusion: (Types::DeviceControllerStateType.values.keys - ["unknown"])
  validates :device_controller_configuration_id, presence: true
  validates :initiator, presence: true

  belongs_to :farm
  belongs_to :device_controller_configuration
end
