# frozen_string_literal: true

module Types
  class RecurrenceType < Types::BaseObject
    field :every, String, null: false
    field :starts, String, null: true
    field :until, String, null: true
    field :between, String, null: true
    field :hour, String, null: true
    field :day, String, null: true
    field :mday, String, null: true
    field :yday, String, null: true
    field :week, String, null: true
    field :month, String, null: true
    field :interval, String, null: true
    field :total, String, null: true
    field :at, String, null: true
    field :on, String, null: true
    field :except, String, null: true
    field :exclude_end, String, null: true

    def every
      object_hash[:every]
    end

    def starts
      object_hash[:starts]
    end

    def until
      object_hash[:until]
    end

    def between
      object_hash[:between]
    end

    def hour
      object_hash[:hour]
    end

    def day
      object_hash[:day]
    end

    def mday
      object_hash[:mday]
    end

    def yday
      object_hash[:yday]
    end

    def week
      object_hash[:week]
    end

    def month
      object_hash[:month]
    end

    def interval
      object_hash[:interval]
    end

    def total
      object_hash[:total]
    end

    def at
      object_hash[:at]
    end

    def on
      object_hash[:on]
    end

    def except
      object_hash[:except]
    end

    def exclude_end
      object_hash[:exclude_end]
    end

    def object_hash
      @object_hash ||= object.to_h
    end
  end
end
