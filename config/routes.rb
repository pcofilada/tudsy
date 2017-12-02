Rails.application.routes.draw do

  devise_for :users, controllers: {
    registrations: 'users/registrations',
  }

  authenticated do
    root to: 'dashboard#index', as: :authenticated_root
  end
  
  root 'home#index'
end
