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
gem 'sidekiq-daemon', git: "https://github.com/airhorns/sidekiq-daemon.git", ref: "a9f07b325cccbdd273b9d0fb1630df97e93f4dc5"
gem "mlanett-redis-lock", git: "https://github.com/mlanett/redis-lock.git"

gem 'mqtt', '~> 0.5.0'
gem 'influxdb', '~> 0.5.3'
gem 'administrate', '~> 0.10.0'
gem 'graphql', '~> 1.8.2'

gem 'ejson'
gem 'sigdump'

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
end

group :test do
  gem 'capybara', '>= 2.15', '< 4.0'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
  gem 'timecop'
  gem 'mocha'
end

gem 'graphiql-rails', group: :development
