class AnswersController < ApplicationController
  before_action :set_exam

  def create
    answer = @exam.answers.new(answer_params)

    if answer.save
      render json: { success: true, answer: answer }
    else
      render json: { status: 403 }
    end
  end

  private

  def set_exam
    @exam = Exam.find(params[:exam_id])
  end

  def answer_params
    params.require(:answer).permit(content: {}).merge(student_id: current_user.id)
  end
end
