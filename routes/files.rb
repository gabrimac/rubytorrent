# encoding: utf-8
class Rubytorrent < Sinatra::Application
  get '/rubytorrent/files' do
    format_response(File.all, request.accept)
  end

  get '/rubytorrent/files/:id' do
    entity ||= File.find(params[:id]) || halt(404)
    format_response(entity, request.accept)
  end

  post '/rubytorrent/files' do
    debugger
    body = MultiJson.load request.body.read
    entity = File.create(
      
      name: body['name'],
      
      path: body['path'],
      
      size: body['size'],
      
    )
    status 201
    format_response(entity, request.accept)
  end

  put '/rubytorrent/files/:id' do
    body = MultiJson.load request.body.read
    entity ||= File.find(params[:id]) || halt(404)
    halt 500 unless entity.update(
      
      name: body['name'],
      
      path: body['path'],
      
      size: body['size'],
      
    )
    format_response(entity, request.accept)
  end

  delete '/rubytorrent/files/:id' do
    entity ||= File.find(params[:id]) || halt(404)
    halt 500 unless entity.destroy
    status 204
  end
end
