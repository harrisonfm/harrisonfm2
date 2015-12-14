module.exports = {
	all: {
		files: {
			'assets/js/main.js': ['assets/js/main.js']
		},
		options: {
			mangle: {
				except: ['jQuery']
			}
		}
	}
};