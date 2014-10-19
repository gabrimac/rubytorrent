class CreateTorrents < ActiveRecord::Migration
  def change
    create_table :torrents do |t|
      
      t.string :name
      
      t.string :path
      
    end
  end
end
