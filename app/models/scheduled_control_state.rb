# frozen_string_literal: true

# Represents one element of a Schedule where a certain controller should be switched to a certain state at a given time.
class ScheduledControlState < ApplicationRecord
  validates :recurrence, presence: true
  validates :desired_state, presence: true, inclusion: (Types::DeviceControllerStateType.values.keys - ["unknown"])
  validates :device_controller_configuration_id, presence: true

  serialize :recurrence, Montrose::Recurrence

  belongs_to :schedule
  belongs_to :farm
  belongs_to :device_controller_configuration
end
