# frozen_string_literal: true

module Types
  class RecurrenceInput < Types::BaseInputObject
    argument :every, String, required: true
    argument :starts, String, required: false
    argument :until, String, required: false
    argument :between, String, required: false
    argument :hour, String, required: false
    argument :day, String, required: false
    argument :mday, String, required: false
    argument :yday, String, required: false
    argument :week, String, required: false
    argument :month, String, required: false
    argument :interval, String, required: false
    argument :total, String, required: false
    argument :at, String, required: false
    argument :on, String, required: false
    argument :except, String, required: false
    argument :exclude_end, String, required: false
  end
end
