# encoding: utf-8
class Rubytorrent < Sinatra::Application
  get '/rubytorrent/trackers' do
    format_response(Tracker.all, request.accept)
  end

  get '/rubytorrent/trackers/:id' do
    entity ||= Tracker.find(params[:id]) || halt(404)
    format_response(entity, request.accept)
  end

  post '/rubytorrent/trackers' do
    body = MultiJson.load request.body.read
    entity = Tracker.create(
      
      name: body['name'],
      
      path: body['path'],
      
    )
    status 201
    format_response(entity, request.accept)
  end

  put '/rubytorrent/trackers/:id' do
    body = MultiJson.load request.body.read
    entity ||= Tracker.find(params[:id]) || halt(404)
    halt 500 unless entity.update(
      
      name: body['name'],
      
      path: body['path'],
      
    )
    format_response(entity, request.accept)
  end

  delete '/rubytorrent/trackers/:id' do
    entity ||= Tracker.find(params[:id]) || halt(404)
    halt 500 unless entity.destroy
    status 204
  end
end