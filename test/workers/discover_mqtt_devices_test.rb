# frozen_string_literal: true

require 'test_helper'

class DiscoverMqttDevicesTest < ActiveSupport::TestCase
  test "it runs for a farm" do
    DiscoverMqttDevices.new.perform(farms(:bct).id)
  end
end
