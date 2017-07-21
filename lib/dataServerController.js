var serverController = require('./serverController')
var config = require('config')
var serverHost = config.get("dataServer")

module.exports = serverController(serverHost)