require "xmlrpc/client"

class Tracker
  attr_accessor :type, :url, :enable, :open

  def initialize(type, url, enable, open)
    @type = type
    @url = url
    @enable = enable
    @open = open
  end

  def self.all
    trackers = []
    downloads = Download.all
    downloads.each do |download|
      download.trackers.each do |tc|
        trackers << new(*tc) unless trackers.include? tc
      end
    end
    trackers
  end
end