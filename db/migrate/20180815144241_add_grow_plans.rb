class AddGrowPlans < ActiveRecord::Migration[5.2]
  def up
    farm = Farm.first

    farm.grow_plans.create!(
      name: "BA Lettuce",
      category: "Greens",
      notes: "",
      grow_plan_environments: [
        GrowPlanEnvironment.new(farm: farm, environment_type: "Germination", starts_at_hours: 0, minimum_temperature: 15, maximum_temperature: 20, minimum_hours_light: 0, maximum_hours_light: 0),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Seedling",
          starts_at_hours: 252,
          minimum_temperature: 7,
          maximum_temperature: 21,
          minimum_hours_light: 10,
          maximum_hours_light: 12,
          minimum_ec: 0.4,
          maximum_ec: 0.8,
          minimum_ph: 5.6,
          maximum_ph: 6.2
        ),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Vegetative",
          starts_at_hours: 840,
          minimum_temperature: 7,
          maximum_temperature: 21,
          minimum_hours_light: 10,
          maximum_hours_light: 18,
          minimum_ec: 0.8,
          maximum_ec: 1.2,
          minimum_ph: 5.6,
          maximum_ph: 6.2
        )
      ],
      grow_plan_actions: [
        GrowPlanAction.new(farm: farm, action_type: "Seed", occurs_at_hours: 0),
        GrowPlanAction.new(farm: farm, action_type: "Transplant", occurs_at_hours: 840),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 1176)
      ]
    )

    farm.grow_plans.create!(
      name: "BA Arugula",
      category: "Greens",
      notes: "",
      grow_plan_environments: [
        GrowPlanEnvironment.new(farm: farm, environment_type: "Germination", starts_at_hours: 0, minimum_temperature: 15, maximum_temperature: 20, minimum_hours_light: 0, maximum_hours_light: 0),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Seedling",
          starts_at_hours: 252,
          minimum_temperature: 10,
          maximum_temperature: 18.3,
          minimum_hours_light: 10,
          maximum_hours_light: 12,
          minimum_ec: 0.4,
          maximum_ec: 0.8,
          minimum_ph: 6.0,
          maximum_ph: 6.8
        ),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Vegetative",
          starts_at_hours: 840,
          minimum_temperature: 10,
          maximum_temperature: 18.3,
          minimum_hours_light: 10,
          maximum_hours_light: 18,
          minimum_ec: 0.8,
          maximum_ec: 1.2,
          minimum_ph: 6.0,
          maximum_ph: 6.8
        )
      ],
      grow_plan_actions: [
        GrowPlanAction.new(farm: farm, action_type: "Seed", occurs_at_hours: 0),
        GrowPlanAction.new(farm: farm, action_type: "Transplant", occurs_at_hours: 840),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 1176)
      ]
    )

    farm.grow_plans.create!(
      name: "BA Kale",
      category: "Greens",
      notes: "",
      grow_plan_environments: [
        GrowPlanEnvironment.new(farm: farm, environment_type: "Germination", starts_at_hours: 0, minimum_temperature: 15, maximum_temperature: 29, minimum_hours_light: 0, maximum_hours_light: 0),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Seedling",
          starts_at_hours: 144,
          minimum_temperature: 7,
          maximum_temperature: 30,
          minimum_hours_light: 10,
          maximum_hours_light: 12,
          minimum_ec: 0.9,
          maximum_ec: 1.5,
          minimum_ph: 6.0,
          maximum_ph: 7.5
        ),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Vegetative",
          starts_at_hours: 756,
          minimum_temperature: 7,
          maximum_temperature: 30,
          minimum_hours_light: 10,
          maximum_hours_light: 18,
          minimum_ec: 1.8,
          maximum_ec: 3,
          minimum_ph: 6.0,
          maximum_ph: 7.5
        )
      ],
      grow_plan_actions: [
        GrowPlanAction.new(farm: farm, action_type: "Seed", occurs_at_hours: 0),
        GrowPlanAction.new(farm: farm, action_type: "Transplant", occurs_at_hours: 756),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 1176),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 1680),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 2688)
      ]
    )

    farm.grow_plans.create!(
      name: "BA Mustard Greens",
      category: "Greens",
      notes: "",
      grow_plan_environments: [
        GrowPlanEnvironment.new(farm: farm, environment_type: "Germination", starts_at_hours: 0, minimum_temperature: 15, maximum_temperature: 29, minimum_hours_light: 0, maximum_hours_light: 0),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Seedling",
          starts_at_hours: 144,
          minimum_temperature: 10,
          maximum_temperature: 24,
          minimum_hours_light: 10,
          maximum_hours_light: 12,
          minimum_ec: 0.9,
          maximum_ec: 1.5,
          minimum_ph: 6.0,
          maximum_ph: 7.5
        ),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Vegetative",
          starts_at_hours: 756,
          minimum_temperature: 10,
          maximum_temperature: 24,
          minimum_hours_light: 10,
          maximum_hours_light: 18,
          minimum_ec: 1.2,
          maximum_ec: 2.4,
          minimum_ph: 6.0,
          maximum_ph: 7.5
        )
      ],
      grow_plan_actions: [
        GrowPlanAction.new(farm: farm, action_type: "Seed", occurs_at_hours: 0),
        GrowPlanAction.new(farm: farm, action_type: "Transplant", occurs_at_hours: 756),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 1176),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 1680),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 2688)
      ]
    )

    farm.grow_plans.create!(
      name: "BA Bok Choy",
      category: "Greens",
      notes: "",
      grow_plan_environments: [
        GrowPlanEnvironment.new(farm: farm, environment_type: "Germination", starts_at_hours: 0, minimum_temperature: 15, maximum_temperature: 24, minimum_hours_light: 0, maximum_hours_light: 0),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Seedling",
          starts_at_hours: 144,
          minimum_temperature: 12,
          maximum_temperature: 24,
          minimum_hours_light: 10,
          maximum_hours_light: 12,
          minimum_ec: 1,
          maximum_ec: 1.5,
          minimum_ph: 6.0,
          maximum_ph: 7.5
        ),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Vegetative",
          starts_at_hours: 756,
          minimum_temperature: 12,
          maximum_temperature: 24,
          minimum_hours_light: 10,
          maximum_hours_light: 18,
          minimum_ec: 1.5,
          maximum_ec: 2.5,
          minimum_ph: 6.0,
          maximum_ph: 7.5
        )
      ],
      grow_plan_actions: [
        GrowPlanAction.new(farm: farm, action_type: "Seed", occurs_at_hours: 0),
        GrowPlanAction.new(farm: farm, action_type: "Transplant", occurs_at_hours: 756),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 1680),
      ]
    )

    farm.grow_plans.create!(
      name: "BA Basil",
      category: "Herbs",
      notes: "",
      grow_plan_environments: [
        GrowPlanEnvironment.new(farm: farm, environment_type: "Germination", starts_at_hours: 0, minimum_temperature: 18, maximum_temperature: 29, minimum_hours_light: 0, maximum_hours_light: 0),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Seedling",
          starts_at_hours: 204,
          minimum_temperature: 18,
          maximum_temperature: 29,
          minimum_hours_light: 10,
          maximum_hours_light: 12,
          minimum_ec: 0.7,
          maximum_ec: 1.1,
          minimum_ph: 6.0,
          maximum_ph: 7.5
        ),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Vegetative",
          starts_at_hours: 672,
          minimum_temperature: 18,
          maximum_temperature: 29,
          minimum_hours_light: 10,
          maximum_hours_light: 18,
          minimum_ec: 1.6,
          maximum_ec: 2.2,
          minimum_ph: 6.2,
          maximum_ph: 6.8
        )
      ],
      grow_plan_actions: [
        GrowPlanAction.new(farm: farm, action_type: "Seed", occurs_at_hours: 0),
        GrowPlanAction.new(farm: farm, action_type: "Transplant", occurs_at_hours: 672),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 1512),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 2016),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 2625)
      ]
    )

    farm.grow_plans.create!(
      name: "BA Mint",
      category: "Herbs",
      notes: "",
      grow_plan_environments: [
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Seedling",
          starts_at_hours: 0,
          minimum_temperature: 13,
          maximum_temperature: 21,
          minimum_hours_light: 10,
          maximum_hours_light: 12,
          minimum_ec: 0.7,
          maximum_ec: 1.1,
          minimum_ph: 6.0,
          maximum_ph: 7.5
        ),
        GrowPlanEnvironment.new(
          farm: farm,
          environment_type: "Vegetative",
          starts_at_hours: 420,
          minimum_temperature: 13,
          maximum_temperature: 21,
          minimum_hours_light: 10,
          maximum_hours_light: 18,
          minimum_ec: 2.0,
          maximum_ec: 2.6,
          minimum_ph: 6.5,
          maximum_ph: 7.0
        )
      ],
      grow_plan_actions: [
        GrowPlanAction.new(farm: farm, action_type: "Cutting", occurs_at_hours: 0),
        GrowPlanAction.new(farm: farm, action_type: "Transplant", occurs_at_hours: 420),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 924),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 1344),
        GrowPlanAction.new(farm: farm, action_type: "Harvest", occurs_at_hours: 1764)
      ]
    )
  end

  def down
    GrowPlan.where("name LIKE 'BA%'").all.each(&:destroy)
  end
end
