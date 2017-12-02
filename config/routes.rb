Rails.application.routes.draw do

  devise_for :users, controllers: {
    registrations: 'users/registrations',
  }

  authenticated do
    root to: 'dashboard#index', as: :authenticated_root
  end
  
  root 'home#index'

  resources :subjects do
    resources :exams, only: %i[new create]
  end

  resources :subject_enrolleds do
    collection do
      get :view
      patch :enroll
    end
  end
end
