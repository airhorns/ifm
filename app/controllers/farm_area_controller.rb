# frozen_string_literal: true

class FarmAreaController < ApplicationController
  before_action :authenticate_farmer!

  def current_farm
    @current_farm ||= Farm.first
  end
end
