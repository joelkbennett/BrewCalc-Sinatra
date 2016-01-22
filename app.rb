require 'sinatra'
require 'sinatra/activerecord'
require 'bcrypt'

class Brew < ActiveRecord::Base
  validates_presence_of :name, :grain, :hops
  belongs_to :users, :foreign_key => :id
end

class User < ActiveRecord::Base
  validates_presence_of :username, :email, :password, :salt
  has_many :brews, :foreign_key => :id
end

module BrewCalc
  class App < Sinatra::Application
    # Configuration
    set :database, { adapter: 'sqlite3', database: 'brewCalc.db' }
    set :sessions, true

    # helpers do; end

    # Brew Routes
    get '/brews' do
      if login?
        current_user = User.find_by(:username => username)
        @brews = Brew.all.where(:users_id => current_user.id)
        erb :brewlist, :layout => :wrap
      else
        redirect '/'
      end
    end

    get '/brews/new' do
      erb :newbrew, :layout => :wrap
    end

    post '/brews' do
      current_user = User.find_by(:username => username)
      new_brew = Brew.create(name: params[:title], grain: params[:grain], hops: params[:hops], date: params[:date], users_id: current_user.id)
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
      erb :index, :layout => :wrap
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

    get '/users' do
      @users = User.all
      erb :users, :layout => :wrap
    end

    get '/logout' do
      session[:username] = nil
      redirect '/'
    end
  end
end

#require_relative 'models/init'
require_relative 'helpers/init'
#require_relative 'routes/init'