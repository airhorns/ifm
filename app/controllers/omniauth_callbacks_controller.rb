# frozen_string_literal: true
class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def signin
    if farmer_signed_in?
      redirect_to root_path
    else
      redirect_to farmer_google_oauth2_omniauth_authorize_path
    end
  end

  def google_oauth2
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = Farmer.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      sign_in_and_redirect @user, event: :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, kind: "Google") if is_navigational_format?
    else
      session["devise.google_oauth2_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to root_path
  end
end
