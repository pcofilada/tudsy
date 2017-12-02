class DeleteFirstLastToUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :first_name
    remove_column :users, :last_name
    remove_column :users, :account_type
  end
end
