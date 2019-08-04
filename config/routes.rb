Rails.application.routes.draw do
  devise_for :users
  
  get '*path', :to => 'flashcards#root', constraints: -> (request){ request.format.html? }
  
  resources :flashcards

  root :to => 'welcome#index'
end
