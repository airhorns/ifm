# frozen_string_literal: true

Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"

  root to: 'client_side_app#index'
  get :app, to: 'client_side_app#index'

  namespace :admin do
    resources :device_configurations
    resources :device_discovery_logs
    resources :farms
    resources :mqtt_topic_states

    root to: "device_configurations#index"

    namespace :tools do
      mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
      mount Sidekiq::Web => '/sidekiq'
    end
  end

  health_check_routes
  mount RailsDb::Engine, at: "/rails_db", as: 'rails_db'
  get '*path', to: 'client_side_app#index'
end
