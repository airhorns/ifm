Raven.configure do |config|
  if ENV['SENTRY_DSN']
    config.dsn = ENV['SENTRY_DSN']
  end
  config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
end
