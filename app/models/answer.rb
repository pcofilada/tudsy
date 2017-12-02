class Answer < ApplicationRecord
  belongs_to :exam
  belongs_to :student

  def preview_results
    {
      total_score: total_score,
      no_questions: exam.questions.count,
      results: results,
    }
  end

  def results
    results = []
    exam.questions.each_with_index do |question, index|
      result = { 
        question: question[1]['item'],
        correct_answer: question[1]['answer'],
        student_answer: content[index.to_s]
      }
      results << result
    end
    results
  end

  def total_score
    counter = 0
    exam.questions.each_with_index do |question, index|
      if question[1]['answer'] == content[index.to_s]
        counter = counter + 1
      end
    end
    counter
  end
end
