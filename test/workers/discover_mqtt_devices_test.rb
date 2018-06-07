# frozen_string_literal: true

require 'test_helper'

class DiscoverMqttDevicesTest < ActiveSupport::TestCase
  test "it performs" do
    DiscoverMqttDevices.new.perform(farms(:bct).id)
  end
end
