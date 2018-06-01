require 'scan_beacon'
scanner = ScanBeacon::CoreBluetoothScanner.new cycle_seconds: 1
scanner.scan do |beacons|
  beacons.each do |beacon|
    puts beacon.inspect
  end
end
