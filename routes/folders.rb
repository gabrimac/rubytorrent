# encoding: utf-8
class Rubytorrent < Sinatra::Application
  get '/rubytorrent/folders' do
    format_response(Folder.all, request.accept)
  end

  get '/rubytorrent/folders/:id' do
    entity ||= Folder.find(params[:id]) || halt(404)
    format_response(entity, request.accept)
  end

  post '/rubytorrent/folders' do
    body = MultiJson.load request.body.read
    entity = Folder.create(
      
      path: body['path'],
      
      user_id: body['user_id'],
      
    )
    status 201
    format_response(entity, request.accept)
  end

  put '/rubytorrent/folders/:id' do
    body = MultiJson.load request.body.read
    entity ||= Folder.find(params[:id]) || halt(404)
    halt 500 unless entity.update(
      
      path: body['path'],
      
      user_id: body['user_id'],
      
    )
    format_response(entity, request.accept)
  end

  delete '/rubytorrent/folders/:id' do
    entity ||= Folder.find(params[:id]) || halt(404)
    halt 500 unless entity.destroy
    status 204
  end
end
