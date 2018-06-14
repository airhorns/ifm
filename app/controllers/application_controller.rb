# frozen_string_literal: true

class ApplicationController < ActionController::Base
  force_ssl if Rails.env.production?
end
