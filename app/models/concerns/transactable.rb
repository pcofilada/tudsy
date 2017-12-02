module Transactable
  extend ActiveSupport::Concern

  private

  def log_transaction
    begin
      ActiveRecord::Base.transaction do
        yield
      end
    rescue ActiveRecord::RecordInvalid => exception
      errors[:base] << exception.message
    end
    errors.blank?
  end
end
