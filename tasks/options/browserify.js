module.exports = {
  options: {
    debug: true,
    //transform: ['reactify'],
    //extensions: ['.jsx'],
  },
  dev: {
    /*options: {
      alias: ['react:']  // Make React available externally for dev tools
    },*/
    src: ['assets/js/src/*.js'],
    dest: 'assets/js/main.js'
  },
};