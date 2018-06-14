module TooLoudInDevelopment
  def perform(*args)
    unless Rails.env.production?
      log_level = Rails.logger.level
      Rails.logger.level = :warn
    end
    super
  ensure
    Rails.logger.level = log_level
  end
end
