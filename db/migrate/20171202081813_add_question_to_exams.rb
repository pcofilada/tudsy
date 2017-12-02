class AddQuestionToExams < ActiveRecord::Migration[5.1]
  def up
    add_column :exams, :questions, :jsonb
    add_index :exams, :questions, using: :gin
  end

  def down
    remove_column :exams, :questions, :jsonb
  end
end
