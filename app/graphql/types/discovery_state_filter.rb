# frozen_string_literal: true

module Types
  class DiscoveryStateFilter < BaseEnum
    value "DISMISSED", "All discoveries marked as undesirable or not requiring enlisting"
    value "ENLISTED", "All discoveries already enlisted as devices into the system"
    value "PENDING", "All discoveries that haven't been acted on yet"
  end
end
