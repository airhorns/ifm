# frozen_string_literal: true

class IfmSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  def id_from_object(object, type, _ctx)
    "#{type.name.underscore}-#{object.id}"
  end
end
