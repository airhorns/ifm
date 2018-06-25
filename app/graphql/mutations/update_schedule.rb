# frozen_string_literal: true

module Mutations
  class UpdateSchedule < ResourceAndChildrenMutation
    null true

    argument :input, Types::UpdateScheduleInput, required: true

    field :schedule, Types::ScheduleType, null: true
    field :errors, [String], null: false

    def mutatable_associations
      [:scheduled_control_states]
    end
  end
end
