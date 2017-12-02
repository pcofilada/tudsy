class SignupForm
  include Virtus.model(nullify_blank: true)
  extend ActiveModel::Naming
  include ActiveModel::Validations
  include Transactable


  ACCOUNT_TYPE = %w[student instructor]

  attribute :email, String
  attribute :password, String
  attribute :password_confirmation, String
  attribute :first_name, String
  attribute :last_name, String
  attribute :type, String

  validates :type, inclusion: { in: ACCOUNT_TYPE, message: "supported type include #{ACCOUNT_TYPE.to_s}" }

  def initialize(params = {})
    super
  end

  def submit
    valid? ? create! : false
  end

  private

  def create!
    log_transaction do
      save_account
    end
  end

  def save_account
    user = User.new(user_params)
    user.type = type.camelcase
    user.save!
    user.create_profile!(profile_params)
  end

  def user_params
    {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    }
  end

  def profile_params
    {
      first_name: first_name,
      last_name: last_name
    }
  end
end
