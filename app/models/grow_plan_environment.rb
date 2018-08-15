# frozen_string_literal: true

class GrowPlanEnvironment < ApplicationRecord
  ENVIRONMENT_TYPES = %w(Germination Seedling Vegetative Flowering Custom)

  validates :environment_type, presence: true, inclusion: ENVIRONMENT_TYPES
  validates :starts_at_hours, presence: true, numericality: { greater_than_or_equal_to: 0 }

  belongs_to :farm
  belongs_to :grow_plan
end
