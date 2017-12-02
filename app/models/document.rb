class Document < ApplicationRecord
  mount_uploader :content, DocumentUploader

  belongs_to :subject
end
