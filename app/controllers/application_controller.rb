# frozen_string_literal: true

class ApplicationController < ActionController::Base
  force_ssl if Rails.env.production?

  def new_session_path(scope)
    new_farmer_session_path
  end
end
