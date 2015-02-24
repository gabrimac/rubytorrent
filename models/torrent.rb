require 'xmlrpc/base64'

class Torrent

  def initialize(content)
    @content = content
  end

  def load
    base64_content = XMLRPC::Base64.new(@content, state = :dec)
    begin
      return true if connection.server.call('load_raw_start', base64_content) == 1
      false
    rescue XMLRPC::FaultException => string
      print string
      false
    end
  end

  def connection
    connector = RpcxmlConnector.instance
    connector.load_connector
    connector
  end

end
