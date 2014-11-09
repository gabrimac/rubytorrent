# encoding: utf-8
class Rubytorrent < Sinatra::Application

  post '/rubytorrent/uploads' do
    path = 'torrents/' + params['file'][:filename]
    content = params['file'][:tempfile].read
    File.open(path, "w") do |f|
      f.write(content)
    end
    halt 500 unless Torrent.new(content).load
    status 201
  end

end
