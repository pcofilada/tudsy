class SubjectsController < DashboardController
  before_action :set_subject, only: %i[show edit update destroy]
  layout 'application', only: :conference

  def index
    if current_user.student?
      @subjects = current_user.subjects
                              .joins(:subject_enrolleds)
                              .where(subject_enrolleds: { status: 'approved' })
                              .order(created_at: :desc)
    else
      @subjects = current_user.subjects.order(created_at: :desc)
    end
  end

  def show
    @approveds = @subject.subject_enrolleds.approved
    @pendings = @subject.subject_enrolleds.pending
    @exams = @subject.exams.order(created_at: :desc)
    @documents = @subject.documents.order(created_at: :desc)
    @document = Document.new
  end

  def new
    @subject = Subject.new(instructor_id: current_user.id)
  end

  def create
    @subject = Subject.new(subject_params)

    if @subject.save
      flash[:success] = 'Successfully created subject'
      redirect_to subjects_path
    else
      flash[:error] = @subject.errors.full_messages.to_sentence
      render :new
    end
  end

  def update
    if @subject.update(subject_params)
      flash[:success] = 'Successfully updated subject'
      redirect_to subjects_path
    else
      flash[:error] = @subject.errors.full_messages.to_sentence
      render :edit
    end
  end

  def destroy
    @subject.destroy
    flash[:success] = 'Successfully deleted subject'
    redirect_to subjects_path
  end

  private

  def subject_params
    params.require(:subject).permit(:title, :description, :instructor_id)
  end

  def set_subject
    @subject = current_user.subjects.find(params[:id])
  end
end
