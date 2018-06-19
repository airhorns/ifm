# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'
gem 'rails', '~> 5.2.0'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'webpacker', '~> 3.5.3'
gem 'jbuilder', '~> 2.5'
gem 'redis', '~> 4.0'
gem 'bcrypt', '~> 3.1.7'
gem 'mini_magick', '~> 4.8'
gem 'rake'

gem 'bootsnap', '>= 1.1.0', require: false

gem 'sidekiq', '~> 5.1.3', require: ['sidekiq', 'sidekiq/web']
gem 'sidecloq', '~> 0.4.1', require: ['sidecloq', 'sidecloq/web']
gem 'sidekiq-daemon', require: ['sidekiq-daemon', 'sidekiq-daemon/web'], git: "https://github.com/airhorns/sidekiq-daemon.git", ref: "0155542121b72dba95c4ee5e9bbc030d112f3de8"
gem "mlanett-redis-lock", git: "https://github.com/mlanett/redis-lock.git"

gem 'mqtt', '~> 0.5.0'
gem 'influxdb', '~> 0.5.3'
gem 'graphql', '~> 1.8.2'
gem 'graphiql-rails', ' ~> 1.4.10'

gem 'ejson'
gem 'sigdump'

gem 'rails_db', '~> 2.0.1', git: 'https://github.com/igorkasyanchuk/rails_db.git', ref: "e5a5de9f3204c7bd1642c2d1988903d4897f6f5d"
gem 'administrate', '~> 0.10.0'
gem 'health_check'

gem "sentry-raven"

group :development, :test do
  gem 'byebug'
  gem 'guard'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'rubocop'
  gem 'kubernetes-deploy'
end

group :test do
  gem 'capybara', '>= 2.15', '< 4.0'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
  gem 'timecop'
  gem 'mocha'
end
