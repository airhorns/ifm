# frozen_string_literal: true

require 'test_helper'

class AllFarmDispatcherIntegrationTest < ActiveSupport::TestCase
  test "frequent dispatch job runs" do
    AllFarmDispatcher.new.perform('frequent')
  end

  test "rare dispatch job runs" do
    AllFarmDispatcher.new.perform('rare')
  end
end
