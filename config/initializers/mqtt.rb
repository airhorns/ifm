require 'paho-mqtt'
require 'logger'

PahoMqtt.send(:remove_const, :SELECT_TIMEOUT)
PahoMqtt::SELECT_TIMEOUT = 1
PahoMqtt.logger = Logger.new(STDOUT)
PahoMqtt.logger.level = Logger::WARN