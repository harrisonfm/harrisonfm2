module.exports = {
	main: {
		options: {
			mode: 'zip',
			archive: './release/hfm.<%= pkg.version %>.zip'
		},
		expand: true,
		cwd: 'release/<%= pkg.version %>/',
		src: ['**/*'],
		dest: 'hfm/'
	}
};