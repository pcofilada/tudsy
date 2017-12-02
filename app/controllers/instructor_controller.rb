class InstructorController < ApplicationController
  before_action :authenticate_user!
  layout 'instructor'
end
