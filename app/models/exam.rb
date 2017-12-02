class Exam < ApplicationRecord
  enum status: { active: 0, inactive: 1 }

  belongs_to :subject
end
