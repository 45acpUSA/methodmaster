Rails.application.routes.draw do
  devise_for :users
  
  get '*path', :to => 'flashcards#root', constraints: -> (request){ request.format.html? }
  
  resources :users do
    resources :flashcards
  end
  
  resources :flashcards, only: %i[index]

  root :to => 'welcome#index'
end
