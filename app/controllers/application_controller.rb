class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
    
  # before_action :configure_permitted_parameters, if: :devise_controller?
    
  def edit
    session[:return_to] ||= request.referer
    redirect_to session.delete(:return_to)
  end
  
  def update
      
  end
  
  protected
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys:[
        :first_name,
        :last_name,
        :date_of_birth,
        :phone,
        :street_1,
        :street_2,
        :city,
        :state,
        :zip
      ]
    )
  end
end
