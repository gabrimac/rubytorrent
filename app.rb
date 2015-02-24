# encoding: utf-8
require 'multi_json'
require 'sinatra'
require 'sinatra/activerecord'
require 'pry-byebug'
require 'redis'
require './environments'

class Rubytorrent < Sinatra::Application
  enable :sessions

end

require_relative 'helpers/init'
require_relative 'models/init'
require_relative 'routes/init'
