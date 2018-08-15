# frozen_string_literal: true

class GrowPlanAction < ApplicationRecord
  ACTION_TYPES = %w(Seed Cutting Transplant Prune Harvest)

  validates :action_type, presence: true, inclusion: ACTION_TYPES
  validates :occurs_at_hours, presence: true, numericality: { greater_than_or_equal_to: 0 }

  belongs_to :grow_plan
  belongs_to :farm
end
