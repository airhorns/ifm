# frozen_string_literal: true

require 'test_helper'

class MqttDeviceDiscovererTest < ActiveSupport::TestCase
  setup do
    @farm = farms(:bct)
  end

  test "it finds the three devices in the fixtures" do
    @discoverer = MqttDeviceDiscoverer.new(@farm)
    assert_equal [], @discoverer.discoveries
  end
end
