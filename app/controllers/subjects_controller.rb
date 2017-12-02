class SubjectsController < ApplicationController
  before_action :set_subject, only: %i[show edit update destroy]

  def index
    @subjects = current_user.subjects.order(created_at: :desc)
  end

  def show
    @pendings = SubjectEnrolled.pending
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
    @subject = Subject.find(params[:id])
  end
end
