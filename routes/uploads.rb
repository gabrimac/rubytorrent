# encoding: utf-8
class Rubytorrent < Sinatra::Application

  post '/rubytorrent/uploads' do
    File.open('torrents/' + params['file'][:filename], "w") do |f|
      f.write(params['file'][:tempfile].read)
    end
    return "The file was successfully uploaded!"
  end

end
