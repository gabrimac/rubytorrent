# encoding: utf-8
class Rubytorrent < Sinatra::Application
  get '/rubytorrent/downloads' do
    if params[:active]
      format_response(Download.search("started"), request.accept)
    else
      format_response(Download.all, request.accept)
    end
  end

  get '/rubytorrent/downloads/:id' do
    entity ||= Download.find(params[:id]) || halt(404)
    format_response(entity, request.accept)
  end

  post '/rubytorrent/downloads' do
    body = MultiJson.load request.body.read
    entity = Download.create(

      name: body['name'],

      path: body['path'],

    )
    status 201
    format_response(entity, request.accept)
  end

  put '/rubytorrent/downloads/:id' do
    body = MultiJson.load request.body.read
    entity ||= Download.find(params[:id]) || halt(404)
    halt 500 unless entity.update(

      name: body['name'],

      path: body['path'],

    )
    format_response(entity, request.accept)
  end

  delete '/rubytorrent/downloads/:id' do
    entity ||= Download.find(params[:id]) || halt(404)
    halt 500 unless entity.destroy
    status 204
  end
end
