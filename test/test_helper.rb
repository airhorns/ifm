# frozen_string_literal: true

# Hacks to allow running tests in the dev container from a shell
ENV['RAILS_ENV'] = 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'mocha/minitest'

module ActiveSupport
  class TestCase
    fixtures :all

    teardown do
      Timecop.return
    end
  end
end
