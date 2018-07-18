# frozen_string_literal: true

module Types
  class BaseObject < GraphQL::Schema::Object
    def self.timestamps
      field :created_at, Types::DateTimeType, null: false
      field :updated_at, Types::DateTimeType, null: false
    end
  end
end
