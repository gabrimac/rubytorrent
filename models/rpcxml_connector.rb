require 'singleton'
require 'xmlrpc/client'

class RpcxmlConnector
  include Singleton

  attr_reader :server

  def load_connector
    @server = XMLRPC::Client.new("localhost", "/RPC2", 80)
    @server.http_header_extra = {"accept-encoding" => "identity"}
  end

end
