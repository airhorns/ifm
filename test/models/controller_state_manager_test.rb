# frozen_string_literal: true

require 'test_helper'

class ControllerStateManagerTest < ActiveSupport::TestCase
  setup do
    @manager = ControllerStateManager.new(farms(:bct), "Tests")
    @controller_configuration = device_controller_configurations(:sonoff_basic_relay_0)
    @controller_configuration_2 = device_controller_configurations(:sonoff_th_relay_0)
  end

  test "requesting and confirming a state transition marks the transition as complete" do
    assert_difference "ControllerStateTransition.count", 1 do
      transition_record = @manager.start_transition(@controller_configuration, "on")
      assert_equal "on", transition_record.to_state
      assert_equal "Tests", transition_record.initiator
      assert_nil transition_record.confirmed_at

      @manager.update_transitions(@controller_configuration, "on")
      transition_record.reload
      assert_not_nil transition_record.confirmed_at
    end
  end

  test "requesting and confirming a state transition marks the transition as complete with symbol states" do
    assert_difference "ControllerStateTransition.count", 1 do
      transition_record = @manager.start_transition(@controller_configuration, :on)
      assert_equal "on", transition_record.to_state
      assert_equal "Tests", transition_record.initiator
      assert_nil transition_record.confirmed_at

      @manager.update_transitions(@controller_configuration, :on)
      transition_record.reload
      assert_not_nil transition_record.confirmed_at
    end
  end

  test "updating with a new state without any existing transitions adds an already confirmed logging transition" do
    assert_difference "ControllerStateTransition.count", 1 do
      transition_record = @manager.update_transitions(@controller_configuration, "on")
      assert_not_nil transition_record.confirmed_at
      assert_equal "on", transition_record.to_state
    end
  end

  test "updating with a new state with existing but confirmed transition that already has that new state doesn't do anything" do
    @manager.start_transition(@controller_configuration, "on")
    @manager.update_transitions(@controller_configuration, "on")

    assert_difference "ControllerStateTransition.count", 0 do
      transition_record = @manager.update_transitions(@controller_configuration, "on")
      assert_not_nil transition_record.confirmed_at
      assert_equal "on", transition_record.to_state
    end
  end

  test "updating with a new state with existing but confirmed transition that already has that new state doesn't do anything with symbol states" do
    @manager.start_transition(@controller_configuration, "on")
    @manager.update_transitions(@controller_configuration, "on")

    assert_difference "ControllerStateTransition.count", 0 do
      transition_record = @manager.update_transitions(@controller_configuration, :on)
      assert_not_nil transition_record.confirmed_at
      assert_equal "on", transition_record.to_state
    end
  end

  test "updating with a new state with an existing, unconfirmed transition with a different to_state adds an already confirmed logging transition to the new state that just came in" do
    assert_difference "ControllerStateTransition.count", 2 do
      original_record = @manager.start_transition(@controller_configuration, "on")

      transition_record = @manager.update_transitions(@controller_configuration, "off")
      assert_not_nil transition_record.confirmed_at
      assert_equal "off", transition_record.to_state

      original_record.reload
      assert_nil original_record.confirmed_at
      assert_equal "on", original_record.to_state
    end
  end

  test "multiple completed state transitions" do
    assert_difference "ControllerStateTransition.count", 3 do
      @manager.start_transition(@controller_configuration, "on")
      @manager.update_transitions(@controller_configuration, "on")
      @manager.start_transition(@controller_configuration, "off")
      @manager.update_transitions(@controller_configuration, "off")
      transition_record = @manager.start_transition(@controller_configuration, "on")
      assert_equal "on", transition_record.to_state
      assert_nil transition_record.confirmed_at

      @manager.update_transitions(@controller_configuration, "on")
      transition_record.reload
      assert_not_nil transition_record.confirmed_at
    end
  end

  test "requesting and confirming a state transition marks the transition specifically for that controller as complete" do
    assert_difference "ControllerStateTransition.count", 2 do
      transition_record_a = @manager.start_transition(@controller_configuration, "on")
      transition_record_b = @manager.start_transition(@controller_configuration_2, "on")

      @manager.update_transitions(@controller_configuration, "on")
      transition_record_a.reload
      transition_record_b.reload
      assert_not_nil transition_record_a.confirmed_at
      assert_nil transition_record_b.confirmed_at

      @manager.update_transitions(@controller_configuration_2, "on")
      transition_record_a.reload
      transition_record_b.reload
      assert_not_nil transition_record_a.confirmed_at
      assert_not_nil transition_record_b.confirmed_at
    end
  end

  test "requesting multiple state transitions and then confirming only confirms the most recent one" do
    transition_record_a = @manager.start_transition(@controller_configuration, "on")
    transition_record_b = @manager.start_transition(@controller_configuration, "on")
    transition_record_c = @manager.start_transition(@controller_configuration, "on")

    @manager.update_transitions(@controller_configuration, "on")
    transition_record_a.reload
    transition_record_b.reload
    transition_record_c.reload
    assert_nil transition_record_a.confirmed_at
    assert_nil transition_record_b.confirmed_at
    assert_not_nil transition_record_c.confirmed_at

    @manager.update_transitions(@controller_configuration, "on")
    @manager.update_transitions(@controller_configuration, "on")
    transition_record_a.reload
    transition_record_b.reload
    transition_record_c.reload
    assert_nil transition_record_a.confirmed_at
    assert_nil transition_record_b.confirmed_at
    assert_not_nil transition_record_c.confirmed_at
  end
end
