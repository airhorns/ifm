# frozen_string_literal: true

class IfmSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  def id_from_object(object, _type, _ctx)
    object.id.to_s
  end
end
