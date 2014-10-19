class Download
  attr_accessor :hash, :name, :base_path, :size_bytes, :complete, 
    :state, :base_filename, :bitfield, :bytes_done, :chunk_size, 
    :chunk_hashed, :completed_bytes, :completed_chunks, :connection_current, 
    :connection_leech, :connection_seed, :creation_date, :custom1, :custom2, 
    :custom3, :custom4, :custom5, :custom_throw, :directory, :directory_base, 
    :down_rate, :down_total, :free_diskspace, :hashing, :hashing_failed, 
    :ignore_commands, :left_bytes, :loaded_file, :local_id, :local_id_html, 
    :max_file_size, :max_size_pex, :message, :mode, :peer_exchange, :peers_accounted, 
    :peers_complete, :peers_connected, :peers_max, :peers_min, :peers_connected, 
    :peers_max, :peers_min, :peers_not_connected, :priority, :priority_str, :ratio, 
    :size_chunks, :size_files, :size_pex, :skip_rate, :skip_total, 
    :state_changed, :state_counter, :throttle_name, :tied_to_file, :tracker_focus, 
    :tracker_numwant, :tracker_size, :up_rate, :up_total, :uploads_max

  DOWNLOAD_DATA = %i(hash name base_path
    complete state base_filename bitfield bytes_done
    chunk_size chunks_hashed completed_bytes completed_chunks
    connection_current connection_leech connection_seed
    creation_date custom1 custom2 custom3 custom4 custom5
    directory directory_base down_rate down_total
    free_diskspace hashing hashing_failed ignore_commands
    left_bytes loaded_file local_id local_id_html max_file_size
    max_size_pex message peer_exchange peers_accounted
    peers_complete peers_max peers_min peers_connected
    peers_max peers_min peers_not_connected
    priority priority_str ratio size_bytes size_chunks size_files
    size_pex skip_rate skip_total state_changed state_counter
    throttle_name tied_to_file tracker_focus tracker_numwant
    tracker_size up_rate up_total uploads_max)

  def initialize(*args)
    DOWNLOAD_DATA.each_with_index do |data, index|
      instance_variable_set("@#{data}", args[index])
    end
  end

  def self.all
    search("main")
  end

  def self.where(query)
    search(query)
  end

  def open
    action('open')
  end

  def pause
    action('pause')
  end

  private

  def search(query)
    connection
    downloads = []
    args = DOWNLOAD_DATA.map { |elem| "d.get_#{elem}=" }
    torrents = connector.server.call 'd.multicall', "#{query}", *args
    torrents.each do |torrent|
      download = new(*torrent)
      downloads << download
    end
    downloads
  end

  def action(action)
    connection
    download = connector.server.call "d.#{action}", self.hash 
  end

  def connection
    connector = RpcxmlConnector.instance
    connector.load_connector
  end
end
