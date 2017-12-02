class AnswersController < ApplicationController
  before_action :set_exam
  before_action :set_answer, only: %i[results]

  def create
    answer = @exam.answers.new(answer_params)
    if answer.save
      render json: { success: true, answer: answer }
    else
      render json: { status: 403 }
    end
  end

  def results
  end

  private

  def set_exam
    @exam = Exam.find(params[:exam_id])
  end
  
  def set_answer
    @answer = Answer.find(params[:id])
  end

  def answer_params
    params.require(:answer).permit(content: {}).merge(student_id: current_user.id)
  end
end
