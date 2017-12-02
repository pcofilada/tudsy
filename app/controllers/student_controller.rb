class StudentController < ApplicationController
  before_action :authenticate_user!
  layout 'student'
end
