class Farmer < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :trackable, :omniauthable, :confirmable, omniauth_providers: [:google_oauth2]

  validates :email, presence: true
  validates :full_name, presence: true

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.google_oauth2_data"] && session["devise.google_oauth2_data"]["info"]
        user.email = data["email"] if user.email.blank?
        user.full_name = data["name"] if user.full_name.blank?
      end
    end
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create! do |farmer|
      farmer.email = auth.info['email']
      farmer.full_name = auth.info['name']
      farmer.skip_confirmation!
    end
  end
end
