# frozen_string_literal: true

if Object.const_defined?('RailsDb')
  RailsDb.setup do |config|
    config.enabled = true
    config.automatic_routes_mount = false

    # set tables which you want to hide ONLY
    # config.black_list_tables = ['users', 'accounts']

    # set tables which you want to show ONLY
    # config.white_list_tables = ['posts', 'comments']

    # # Enable http basic authentication
    # config.http_basic_authentication_enabled = false

    # # Enable http basic authentication
    # config.http_basic_authentication_user_name = 'rails_db'

    # # Enable http basic authentication
    # config.http_basic_authentication_password = 'password'

    # # Enable http basic authentication
    # config.verify_access_proc = proc { |controller| true }
  end
end
