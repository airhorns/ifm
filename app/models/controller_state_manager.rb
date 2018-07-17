# frozen_string_literal: true

class ControllerStateManager
  attr_accessor :farm, :initiator

  def initialize(farm, initiator)
    @farm = farm
    @initiator = initiator
  end

  def start_transition(device_controller_configuration, requested_state)
    transition = farm.controller_state_transitions.new(
      device_controller_configuration: device_controller_configuration,
      confirmed_at: nil,
      to_state: requested_state,
      initiator: @initiator
    )
    transition.save!
    transition
  end

  def update_transitions(device_controller_configuration, new_state)
    transition = farm.controller_state_transitions.where(device_controller_configuration_id: device_controller_configuration.id).order("created_at DESC, id DESC").first

    if transition
      if transition.confirmed_at.nil? && transition.to_state == new_state
        transition.confirmed_at = Time.now.utc
        transition.save!
        transition
      else
        Rails.logger.warn "External state transition detected. Controller transitioned to state #{new_state} but most recent transition is #{transition.to_state}. Transition details: #{transition.inspect}. Logging transition."
        log_external_transition(device_controller_configuration, new_state)
      end
    else
      Rails.logger.info "External state transition detected. No state transition found for controller_configuration_id=#{device_controller_configuration.id}. Logging transition."
      log_external_transition(device_controller_configuration, new_state)
    end
  end

  private

  def log_external_transition(device_controller_configuration, new_state)
    state_transition = farm.controller_state_transitions.create!(
      device_controller_configuration_id: device_controller_configuration.id,
      confirmed_at: Time.now.utc,
      to_state: new_state,
      initiator: @initiator
    )
    Rails.logger.info "Logged external state transition with ID=#{state_transition.id}"
    state_transition
  end
end
