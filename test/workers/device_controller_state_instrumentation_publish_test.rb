# frozen_string_literal: true

require 'test_helper'

class DeviceControllerStateInstrumentationPublishTest < ActiveSupport::TestCase
  test "it runs for a farm" do
    DeviceControllerStateInstrumentationPublish.new.perform(farms(:bct).id)
  end
end
