# frozen_string_literal: true

# Hacks to allow running tests in the dev container from a shell
ENV['RAILS_ENV'] = 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'mocha/minitest'
require 'timecop'
require 'sidekiq/testing'
Sidekiq::Testing.fake!

module ActiveSupport
  class TestCase
    fixtures :all

    teardown do
      Timecop.return
    end

    def stub_mqtt_client
      @stub_mqtt_client ||= stub(on_message: nil, mqtt_loop: nil)
    end
  end
end
