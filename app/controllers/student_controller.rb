class StudentController < DashboardController
  before_action :authenticate_user!
end
