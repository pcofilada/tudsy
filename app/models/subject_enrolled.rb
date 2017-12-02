class SubjectEnrolled < ApplicationRecord
  enum status: { pending: 0, approved: 1 }

  belongs_to :student
  belongs_to :subject
end
