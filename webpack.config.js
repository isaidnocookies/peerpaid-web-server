var path = require('path');
var npmFolder = path.resolve(__dirname, '../node_modules');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.(png|jpg|ico)$/,
        loader: 'url?limit=25000'
      }
    ]
  },
  resolve: {
    alias: {
      // Ensure compatibility to original bootstrap
      'fetch': path.join(npmFolder, 'whatwg-fetch', 'fetch.js')
    }
  }
};