module TooLoudInDevelopment
  def perform(*args)
    log_level = Rails.logger.level
    Rails.logger.level = :warn
    super
  ensure
    Rails.logger.level = log_level
  end
end
