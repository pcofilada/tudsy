class Users::RegistrationsController < Devise::RegistrationsController

  def new
    @form = SignupForm.new()
  end

  def create
    @form = SignupForm.new(signup_params)

    if @form.submit
      flash[:success] = 'Successfully signup!'
      redirect_to root_path
    else
      flash[:error] = @form.errors.full_messages.to_sentence
      render :new
    end
  end

  private

  def signup_params
    params.require(:signup_form).permit(
      :first_name, :last_name, :type,
      :email, :password, :password_confirmation
    )
  end
end
