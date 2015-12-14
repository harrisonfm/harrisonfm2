module.exports = {
	dist: {
		options: {
			processors: [
				require('autoprefixer')({browsers: 'last 2 versions'})
			]
		},
		files: { 
			'assets/css/harrisonfm.css': [ 'assets/css/harrisonfm.css' ]
		}
	}
};