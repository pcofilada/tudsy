class Student < User
  has_many :subject_enrolleds
  has_many :subjects, through: :subject_enrolleds
  has_many :answers
end
