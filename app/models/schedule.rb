# frozen_string_literal: true

# Represents a group of actions that happen at a given time, often repeatedly. For example: water the seedlings is a
# Schedule that tells the pump to come on at a certain time, to go off at a certain time, and to do that every day.
class Schedule < ApplicationRecord
  validates :name, presence: true
  validates :enabled, presence: true, inclusion: [true, false]

  belongs_to :farm

  has_many :scheduled_control_states, validate: true, autosave: true
end
