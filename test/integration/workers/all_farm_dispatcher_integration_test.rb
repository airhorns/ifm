# frozen_string_literal: true

require 'test_helper'

class AllFarmDispatcherIntegrationTest < ActiveSupport::TestCase
  # test "frequent dispatch job runs" do
  #   Sidekiq::Testing.inline! do
  #     AllFarmDispatcher.new.perform('frequent')
  #   end
  # end

  test "rare dispatch job runs" do
    Sidekiq::Testing.inline! do
      AllFarmDispatcher.new.perform('rare')
    end
  end
end
