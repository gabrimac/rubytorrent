require 'singleton'
require 'xmlrpc/client'

class RpcxmlConnector
  include Singleton

  attr_reader :server

  def load_connector
    @server = XMLRPC::Client.new("ns349570.ip-91-121-119.eu", "/RPC2", 80)
    @server.http_header_extra = {"accept-encoding" => "identity"}
  end

end
