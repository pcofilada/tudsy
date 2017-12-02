class Subject < ApplicationRecord
  belongs_to :instructor
  has_many :exams
end
