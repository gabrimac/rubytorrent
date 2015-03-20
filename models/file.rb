class File

	class << self

		def all
			Folder.all.collect{ |folder| Dir.entries(folder.path) }
		end

	end

end
