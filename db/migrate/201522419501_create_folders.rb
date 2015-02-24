class CreateFolders < ActiveRecord::Migration
  def change
    create_table :folders do |t|
      
      t.string :path
      
      t.integer :user_id
      
    end
  end
end
