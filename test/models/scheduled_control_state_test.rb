# frozen_string_literal: true

require 'test_helper'

class ScheduledControlStateTest < ActiveSupport::TestCase
  test "recurrence objects roundtrip through the database" do
    @schedule = farms(:bct).schedules.first
    @recurrence = Montrose.every(:week).at("12pm")

    state = @schedule.scheduled_control_states.create!(
      farm: farms(:bct),
      device_controller_configuration: device_controller_configurations(:sonoff_basic_relay_0),
      desired_state: "on",
      recurrence: @recurrence
    )

    assert_equal @recurrence.to_h, state.recurrence.to_h

    new_state = ScheduledControlState.find(state.id)
    assert_equal @recurrence.to_h, new_state.recurrence.to_h
  end
end
