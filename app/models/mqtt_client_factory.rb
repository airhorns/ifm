module MqttClientFactory
  def self.client_for_url(url, options = {})
    uri = URI(url)
    options = {
      host: uri.host,
      port: uri.port,
      username: uri.user,
      password: uri.password,
      persistent: true,
      blocking: true,
      ssl: false
    }.merge(options)

    client = PahoMqtt::Client.new(options)
    client.connect
    client
  end
end
