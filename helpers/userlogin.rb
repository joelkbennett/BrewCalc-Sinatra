module UserLogin
  def login?
    session[:username].nil? ? false : true
  end

  def username
    session[:username]
  end
end