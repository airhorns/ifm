module DeviceImageUrl
  UNKNOWN_DEVICE_IMAGE = "/images/devices/unknown.jpg"

  def image_url
    root_path = Dir.glob(Rails.root.join("public/images/devices/#{device_class.constantize.file_key}.*")).first
    if root_path
      root_path.sub(Rails.root.join('public').to_s, '')
    else
      UNKNOWN_DEVICE_IMAGE
    end
  end
end
