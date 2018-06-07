# frozen_string_literal: true

class FarmAreaController < ApplicationController
  def current_farm
    @current_farm ||= Farm.first
  end
end
