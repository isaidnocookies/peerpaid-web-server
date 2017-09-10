var NodeRSA = require('node-rsa');

var keychain = {
  jwtkey: require('./jwtkey'),
  btckey: require('./btckey')
};

var rsaKeys = {

};

var getKey = (keyname) => {
  var keyParts = keyname.split('.');

  if (keyParts.length > 1) {
    var keychainItem = keychain[keyParts[0]][keyParts[1]];
    if (keychainItem) {
      var key = rsaKeys[keyname] = rsaKeys[keyname] || new NodeRSA(keychainItem);
      return key;
    }
  }
};

module.exports = {
  encryptOnBitcoinServer: (value) => {
    try {
      return getKey('btckey.cert').encryptPrivate(value, 'base64');
    }
    catch (e) {
      return void 0;
    }
  },
  decryptOnBitcoinServer: (value) => {
    try {
      return getKey('btckey.cert').decrypt(value).toString();
    }
    catch (e) {
      return void 0;
    }
  },

  encryptForBitcoinServer: (value) => {
    try {
      return getKey('btckey.pub2').encrypt(value, 'base64');
    }
    catch (e) {
      return void 0;
    }

  },
  decryptFromBitcoinServer: (value) => {
    try {
      return getKey('btckey.pub2').decryptPublic(value).toString();;
    }
    catch (e) {
      return void 0;
    }

  },
  keys: rsaKeys
};