class AddDurationToExams < ActiveRecord::Migration[5.1]
  def change
    add_column :exams, :duration, :integer
  end
end
