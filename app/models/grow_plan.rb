# frozen_string_literal: true

class GrowPlan < ApplicationRecord
  CATEGORIES = %w(Greens Herbs Fruiting Specialty)

  validates :name, presence: true, uniqueness: true
  validates :category, presence: true, inclusion: CATEGORIES

  belongs_to :farm
  has_many :grow_plan_environments, dependent: :destroy
  has_many :grow_plan_actions, dependent: :destroy
end
