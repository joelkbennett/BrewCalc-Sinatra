require 'sinatra'
require 'sinatra/activerecord'

class Brew < ActiveRecord::Base
    validates_presence_of :name, :grain, :hops
end

module BrewCalc
  class App < Sinatra::Application
    # Configuration
    set :database, { adapter: 'sqlite3', database: 'brews.sqlite3' }
    set :sessions, true

    # Routes
    get '/' do
      erb :dashboard, :layout => :wrap
    end

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
  end
end