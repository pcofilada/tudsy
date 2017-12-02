class CreateSubjects < ActiveRecord::Migration[5.1]
  def change
    create_table :subjects do |t|
      t.string :title
      t.text :description
      t.integer :instructor_id

      t.timestamps
    end
    add_index :subjects, :instructor_id
    add_foreign_key :subjects, :users, column: :instructor_id
  end
end
