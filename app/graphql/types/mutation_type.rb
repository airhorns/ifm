# frozen_string_literal: true
module Types
  class MutationType < BaseObject
    field :enlist_device, mutation: Mutations::EnlistDevice
    field :update_farm, mutation: Mutations::UpdateFarm
  end
end
