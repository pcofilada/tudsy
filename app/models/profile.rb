class Profile < ApplicationRecord
  belongs_to :user

  def fullname
    "#{first_name} #{middle_name} #{last_name}"
  end
end
