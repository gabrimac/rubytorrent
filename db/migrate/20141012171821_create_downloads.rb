class CreateDownloads < ActiveRecord::Migration
  def change
    create_table :downloads do |t|
      
      t.string :name
      
      t.string :path
      
    end
  end
end
