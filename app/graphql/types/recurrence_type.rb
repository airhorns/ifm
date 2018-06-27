# frozen_string_literal: true

module Types
  class RecurrenceType < Types::BaseObject
    field :every, String, null: false
    field :total, Int, null: true
    field :at, [RecurrenceAtType], null: true
    field :starts, String, null: true
    field :until, String, null: true
    field :between, String, null: true
    field :hour, [Int], null: true
    field :day, [RecurrenceDayType], null: true
    field :mday, [Int], null: true
    field :yday, [Int], null: true
    field :week, [Int], null: true
    field :month, [Int], null: true
    field :interval, Int, null: true
    field :on, [String], null: true
    field :except, String, null: true
    field :exclude_end, String, null: true

    def every
      transformed_object[:every]
    end

    def starts
      transformed_object[:starts]
    end

    def until
      transformed_object[:until]
    end

    def between
      transformed_object[:between]
    end

    def hour
      transformed_object[:hour]
    end

    def day
      transformed_object[:day]
    end

    def mday
      transformed_object[:mday]
    end

    def yday
      transformed_object[:yday]
    end

    def week
      transformed_object[:week]
    end

    def month
      transformed_object[:month]
    end

    def interval
      transformed_object[:interval]
    end

    def total
      transformed_object[:total]
    end

    def at
      transformed_object[:at]
    end

    def on
      transformed_object[:on]
    end

    def except
      transformed_object[:except]
    end

    def exclude_end
      transformed_object[:exclude_end]
    end

    def transformed_object
      @transformed_object ||= RecurrenceTransform.transform(object)
    end
  end
end
