Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'surveys#new'
  resources :surveys, only: [:new, :create, :edit, :update, :show]

end
