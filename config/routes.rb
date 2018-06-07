# frozen_string_literal: true

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"

  root to: 'client_side_app#index'
  get :app, to: 'client_side_app#index'

  namespace :admin do
    resources :device_configurations
    resources :device_discovery_logs
    resources :farms
    resources :mqtt_topic_states

    root to: "device_configurations#index"
  end

  mount Sidekiq::Web => '/sidekiq'

  get '*path', to: 'client_side_app#index'
end
