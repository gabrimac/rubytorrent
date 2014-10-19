# encoding: utf-8
class Rubytorrent < Sinatra::Application
  get '/' do 
    send_file File.join('public', 'index.html')
  end
end
