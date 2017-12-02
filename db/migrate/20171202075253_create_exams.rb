class CreateExams < ActiveRecord::Migration[5.1]
  def change
    create_table :exams do |t|
      t.string :title
      t.integer :status, default: 0
      t.belongs_to :subject, foreign_key: true

      t.timestamps
    end
  end
end
