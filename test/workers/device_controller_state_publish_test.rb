# frozen_string_literal: true

require 'test_helper'

class DeviceControllerStatePublishTest < ActiveSupport::TestCase
  test "it runs for a farm" do
    DeviceControllerStatePublish.new.perform(farms(:bct).id)
  end
end
