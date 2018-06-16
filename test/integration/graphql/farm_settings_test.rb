# frozen_string_literal: true

require 'test_helper'

module Graphql
  class FarmSettingsTest < ActiveSupport::TestCase
    setup do
      @farm = farms(:bct)
      @farm_zone = farm_zones(:bct_aisle_1)
      @context = { current_farm: @farm }
    end

    test "getting farm" do
      query = "
        query getFarm {
          farm {
            name
            farmZones {
              id
              name
            }
          }
        }
      "

      result = IfmSchema.execute(query, context: @context)

      assert_nil result.to_h["errors"]
      assert_equal "Big Clear Tests", result.to_h["data"]["farm"]["name"]
      assert result.to_h["data"]["farm"]["farmZones"].map { |zone| zone["name"] }.include?("Germination")
    end

    test "updating farm name" do
      mutation = "
        mutation updateFarm($input: UpdateFarmInput!) {
          updateFarm(input: $input) {
            farm {
              name
              farmZones {
                id
                name
              }
            }
            errors
          }
        }
      "

      result = IfmSchema.execute(
        mutation,
        context: @context,
        variables: {
          input: {
            name: "Little Clear Tests"
          }
        }
      )

      assert_nil result.to_h["errors"]
      assert_equal [], result.to_h["data"]["updateFarm"]["errors"]
      assert_equal "Little Clear Tests", result.to_h["data"]["updateFarm"]["farm"]["name"]
      assert_equal "Little Clear Tests", @farm.reload.name
    end

    test "updating farm zone names" do
      mutation = "
        mutation updateFarm($input: UpdateFarmInput!) {
          updateFarm(input: $input) {
            farm {
              farmZones {
                id
                name
              }
            }
            errors
          }
        }
      "

      result = IfmSchema.execute(
        mutation,
        context: @context,
        variables: {
          input: {
            farmZones: [{ id: @farm_zone.id, name: "Aisle 1 modified" }]
          }
        }
      )

      assert_nil result.to_h["errors"]
      assert_equal [], result.to_h["data"]["updateFarm"]["errors"]
      assert_equal "Aisle 1 modified", result.to_h["data"]["updateFarm"]["farm"]["farmZones"].index_by { |z| z["id"] }[@farm_zone.id.to_s]["name"]
      assert_equal "Aisle 1 modified", @farm_zone.reload.name
    end

    test "a real life farm update example" do
      mutation = "
        mutation updateFarm($input: UpdateFarmInput!) {
          updateFarm(input: $input) {
            farm {
              name
              farmZones {
                id
                name
              }
            }
            errors
          }
        }
      "

      result = IfmSchema.execute(
        mutation,
        context: @context,
        variables: {
          input: {
            name: "Little Clear Tests",
            farmZones: [{
              id: @farm_zone.id,
              name: "Aisle 1 modified"
            }],
            createFarmZones: [{
              name: "Aisle 2"
            }],
            deleteFarmZones: [{
              id: farm_zones(:bct_empty).id
            }]
          }
        }
      )

      assert_nil result.to_h["errors"]
      assert_equal [], result.to_h["data"]["updateFarm"]["errors"]

      assert_equal "Little Clear Tests", result.to_h["data"]["updateFarm"]["farm"]["name"]
      assert_equal "Little Clear Tests", @farm.reload.name

      assert_equal "Aisle 1 modified", result.to_h["data"]["updateFarm"]["farm"]["farmZones"].index_by { |z| z["id"] }[@farm_zone.id.to_s]["name"]
      assert_equal "Aisle 1 modified", @farm_zone.reload.name

      created = result.to_h["data"]["updateFarm"]["farm"]["farmZones"].detect { |z| z["name"] == "Aisle 2" }
      assert_not_nil created["id"]
      assert_equal "Aisle 2", FarmZone.find(created["id"]).name

      assert_empty FarmZone.where(id: [farm_zones(:bct_empty).id]).all
    end
  end
end
