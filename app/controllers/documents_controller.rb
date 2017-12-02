class DocumentsController < ApplicationController
  before_action :set_subject

  def index
    @documents = @subject.documents
    @document = Document.new
  end

  def create
    @document = @subject.documents.new(document_params)
    @document.save

    redirect_to subject_documents_path
  end

  def destroy
    document = @subject.documents.find(params[:id])
    document.destroy

    redirect_to subject_documents_path
  end

  private

  def set_subject
    @subject = current_user.subjects.find(params[:subject_id])
  end

  def document_params
    params.require(:document).permit(:content, :name)
  end
end
