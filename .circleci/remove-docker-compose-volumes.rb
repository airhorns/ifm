# frozen_string_literal: true
require 'yaml'

data = YAML.load_file(ARGV[0])

data['services'].each do |_, service|
  if service.respond_to?(:delete)
    service.delete('volumes')
  end
end

File.open(ARGV[0], 'w') do |f|
  f.write(data.to_yaml)
end
