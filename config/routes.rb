Rails.application.routes.draw do
  devise_for :users
  
  resources :flashcards

  get '*path', :to => 'flashcards#root', constraints: -> (request){ request.format.html? }

  root :to => 'flashcards#index'
end
