class CreateAnswers < ActiveRecord::Migration[5.1]
  def change
    create_table :answers do |t|
      t.jsonb :content
      t.integer :student_id
      t.belongs_to :exam, foreign_key: true

      t.timestamps
    end
    add_index :answers, :content, using: :gin
    add_index :answers, :student_id
    add_foreign_key :answers, :users, column: :student_id
  end
end
