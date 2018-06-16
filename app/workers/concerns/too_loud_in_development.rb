# frozen_string_literal: true

module TooLoudInDevelopment
  def perform(*args)
    unless Rails.env.production?
      rails_log_level = Rails.logger.level
      sidekiq_log_level = Sidekiq.logger.level
      Rails.logger.level = :warn
      Sidekiq.logger.level = :warn
    end
    super
  ensure
    unless Rails.env.production?
      Sidekiq.logger.level = sidekiq_log_level
      Rails.logger.level = rails_log_level
    end
  end
end
