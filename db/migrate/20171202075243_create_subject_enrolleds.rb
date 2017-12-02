class CreateSubjectEnrolleds < ActiveRecord::Migration[5.1]
  def change
    create_table :subject_enrolleds do |t|
      t.integer :student_id
      t.belongs_to :subject
      t.integer :status, default: 0
      t.timestamps
    end

    add_index :subject_enrolleds, :student_id
    add_foreign_key :subject_enrolleds, :users, column: :student_id
  end
end
