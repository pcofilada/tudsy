class SubjectEnrolledsController < StudentController
  before_action :set_subject, only: %i[view]

  def index
    @subjects = Subject.all
  end

  def view
  end

  def enroll
    @subject_enrolled = SubjectEnrolled.new(enroll_params)
    if @subject_enrolled.save
      flash[:success] = 'Successfully enrolled to subject'
      redirect_to subject_enrolleds_path
    else 
      flash[:error] = @subject_enrolled.errors.full_messages.to_sentence
      render :show
    end
  end

  private

  def set_subject
    @subject = Subject.find(params[:subject_id])
  end

  def enroll_params
    {
      subject_id: params[:subject_id],
      student_id: current_user.id
    }
  end
end
