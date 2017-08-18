var path = require('path');
var npmFolder = path.resolve(__dirname, '../node_modules');

module.exports = {
  resolve: {
    alias: {
      // Ensure compatibility to original bootstrap
      'fetch': path.join(npmFolder, 'whatwg-fetch', 'fetch.js')
    }
  }
};