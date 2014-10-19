# encoding: utf-8
require 'pry-byebug'

class Rubytorrent < Sinatra::Application
  get '/rubytorrent/torrents' do
    format_response(Torrent.all, request.accept)
  end

  get '/rubytorrent/torrents/:id' do
    entity ||= Torrent.find(params[:id]) || halt(404)
    format_response(entity, request.accept)
  end

  post '/rubytorrent/torrents' do
    p request.body.read
    body = MultiJson.load request.body.read
    entity = Torrent.create(
      
      name: body['name'],
      
      path: body['path'],
      
    )
    status 201
    format_response(entity, request.accept)
  end

  put '/rubytorrent/torrents/:id' do
    body = MultiJson.load request.body.read
    entity ||= Torrent.find(params[:id]) || halt(404)
    halt 500 unless entity.update(
      
      name: body['name'],
      
      path: body['path'],
      
    )
    format_response(entity, request.accept)
  end

  delete '/rubytorrent/torrents/:id' do
    entity ||= Torrent.find(params[:id]) || halt(404)
    halt 500 unless entity.destroy
    status 204
  end
end
