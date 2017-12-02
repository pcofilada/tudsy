class Subject < ApplicationRecord
  belongs_to :instructor
  has_many :exams
  has_many :subject_enrolleds
  has_many :students, through: :subject_enrolleds
  has_many :documents

  validates :title, :description, presence: true
end
