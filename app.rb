require 'sinatra'
require 'sinatra/activerecord'
require 'bcrypt'

class Brew < ActiveRecord::Base
  validates_presence_of :name, :grain, :hops
end

class User < ActiveRecord::Base
  validates_presence_of :username, :email, :password, :salt
end

module BrewCalc
  class App < Sinatra::Application
    # Configuration
    set :database, { adapter: 'sqlite3', database: 'brews.sqlite3' }
    set :sessions, true

    helpers do
      def login?
        session[:username].nil? ? false : true
      end

      def username
        session[:username]
      end
    end

    # Brew Routes
    get '/brews' do
      @brews = Brew.all.order(date: :desc)
      erb :brewlist, :layout => :wrap
    end

    get '/brews/new' do
      erb :newbrew, :layout => :wrap
    end

    post '/brews' do
      new_brew = Brew.create(name: params[:title], grain: params[:grain], hops: params[:hops], date: params[:date])
      redirect '/brews'
    end

    get '/brews/:id' do |bid|
      @brew = Brew.find_by(id: bid)
      erb :singlebrew, :layout => :wrap
    end

    post '/brews/:id' do |bid|
      @brew = Brew.find_by(id: bid)
      @brew.update(name: params[:title], grain: params[:grain], hops: params[:hops], date: params[:date])  
      redirect '/brews'
    end

    delete '/brews/:id' do |bid|
      @brew = Brews.find_by(id: bid)
      @brew.destroy
      redirect '/brews'
    end

    # User Routes
    get '/' do
      erb :dashboard, :layout => :wrap
    end

    post '/' do
      # Login
      @user = User.find_by(username: params[:username])
      if @user.password == BCrypt::Engine.hash_secret(params[:password], @user.salt)
        session[:username] = params[:username]
        redirect '/'
      end
      erd 'error'
    end

    post '/signup' do
      pw_salt = BCrypt::Engine.generate_salt
      pw_hash = BCrypt::Engine.hash_secret(params[:password], pw_salt)
      @user = User.create(username: params[:username], email: params[:email], password: pw_hash, salt: pw_salt)
      session[:username] = params[:username]
      redirect '/'
    end

    get '/logout' do
      session[:username] = nil
      redirect '/'
    end
  end
end