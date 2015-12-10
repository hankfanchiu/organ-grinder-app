Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :tracks, only: [:index, :create, :destroy]
end
