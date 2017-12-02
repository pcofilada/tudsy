class Subject < ApplicationRecord
  belongs_to :instructor
  has_many :exams
  has_many :subject_enrolleds
end
