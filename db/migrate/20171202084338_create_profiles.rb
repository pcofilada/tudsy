class CreateProfiles < ActiveRecord::Migration[5.1]
  def change
    create_table :profiles do |t|
      t.string :first_name
      t.string :last_name
      t.string :middle_name
      t.integer :age
      t.string :gender
      t.belongs_to :user
      t.timestamps
    end
  end
end
