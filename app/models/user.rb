class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  delegate :first_name, :last_name, :fullname, to: :profile

  has_one :profile

  def instructor?
    type == 'Instructor'
  end

  def student?
    type == 'Student'
  end
end
