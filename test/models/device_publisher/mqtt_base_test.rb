require 'test_helper'

module DevicePublisher
  class MqttBaseTest < ActiveSupport::TestCase
    setup do
      @publisher = device_configurations(:sonoff_th).device_instance.publishers[:temperature]
    end

    test "it can comprehend a value to parse it from how it comes in on the bus" do
      assert_equal 25.4, @publisher.comprehend("25.4")
    end

    test "it can publish a value to the time series database" do
      @publisher.publish("25.4")
    end

    test "it doesn't barf on broken values" do
      @publisher.publish("undefined")
    end
  end
end
