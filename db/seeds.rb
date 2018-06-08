# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
farm = Farm.create!(name: "Big Clear Farms")
farm.farm_zones.create!([{name: 'Germination'}, {name: 'Seedling Rack'}, {name: 'Aisle 1'}])
