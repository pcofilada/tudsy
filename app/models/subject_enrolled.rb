class SubjectEnrolled < ApplicationRecord
  enum status: { pending: 0, approved: 1 }

  belongs_to :student
  belongs_to :subject

  scope :pending, ->  { where(status: 'pending') }
end
