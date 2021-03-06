class ExamsController < DashboardController
  before_action :set_subject

  def create
    exam = @subject.exams.new(exam_params)

    if exam.save
      render json: { success: true, exam: exam }
    else
      render json: { status: 403 }
    end
  end

  def results
    @exam = Exam.find(params[:id])
    @answer = @exam.answers.where(student: current_user).first
  end

  def show
    exam = @subject.exams.find(params[:id])
    answer = exam.answers.where(student: current_user).first

    redirect_to results_subject_exam_path(@subject, exam) if answer

    respond_to do |format|
      format.html
      format.json { render json: exam }
    end
  end

  private

  def set_subject
    @subject = current_user.subjects.find(params[:subject_id])
  end

  def exam_params
    params.require(:exam).permit(:title, :duration, questions: {})
  end
end
