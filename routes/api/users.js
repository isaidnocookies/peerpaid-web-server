var express = require('express')
var router = express.Router()
const request = require('request')
const config = require('config')
const dsController = require("./dataServerController")



router.post('/login', dsController.relay())

router.post('/register', dsController.relay())

router.post('/token', dsController.relay())

router.post('/getData', dsController.relay())


module.exports = router;
