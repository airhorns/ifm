# frozen_string_literal: true

Sidekiq.configure_server do |_config|
  Rails.logger = Sidekiq::Logging.logger
  ActiveRecord::Base.logger = Sidekiq::Logging.logger
end
