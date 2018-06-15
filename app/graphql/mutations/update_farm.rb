# frozen_string_literal: true

module Mutations
  class UpdateFarm < ResourceAndChildrenMutation
    null true

    argument :input, Types::UpdateFarmInput, required: true

    field :farm, Types::FarmType, null: true
    field :errors, [String], null: false

    def mutatable_associations
      [:farm_zones]
    end

    def root_object(_input, farm)
      farm
    end
  end
end
