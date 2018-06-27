# frozen_string_literal: true

module Types
  module RecurrenceTransform
    def self.transform(recurrence)
      recurrence = recurrence.to_h

      if recurrence.key?(:at)
        recurrence[:at] = recurrence[:at].map do |at|
          { hour: at[0], minute: at[1], second: at[2] }
        end
      end

      if recurrence.key?(:on)
        recurrence[:on] = Array(recurrence[:on])
      end

      if recurrence.key?(:day)
        recurrence[:day] = if recurrence[:day].is_a?(Array)
          recurrence[:day].map do |day|
            { day: day }
          end
        else
          recurrence[:day].map do |(day, field)|
            { day: day, field: field }
          end
        end
      end

      recurrence
    end
  end
end
