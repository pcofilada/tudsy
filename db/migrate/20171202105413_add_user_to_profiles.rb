class AddUserToProfiles < ActiveRecord::Migration[5.1]
  def change
    add_reference :profiles, :user, index: true
  end
end
