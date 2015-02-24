class File

	def initialize

	end

	class << self

		def all
			files = []
			Folder.all.each{ |folder| files.push(Dir.entries(folder.path)) }
			files
		end

	end

end
