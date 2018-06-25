# frozen_string_literal: true

require 'test_helper'

module Graphql
  class SchedulesTest < ActiveSupport::TestCase
    setup do
      @farm = farms(:bct)
      @context = { current_farm: @farm }
    end

    test "getting schedules" do
      query = "
        query getSchedules {
          schedules {
            id
            name
            enabled
            scheduledControlStates {
              id
              recurrence {
                every
              }
              desiredState
              deviceControllerConfiguration {
                id
              }
            }
          }
        }
      "

      result = IfmSchema.execute(query, context: @context)

      assert_nil result.to_h["errors"]
      assert_equal "Water Seedlings", result.to_h["data"]["schedules"][0]["name"]
    end
  end
end
