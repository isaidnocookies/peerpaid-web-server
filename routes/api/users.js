var express = require('express');
var router = express.Router();
const request = require('request')
const config = require('config')


router.post('/login', function (req, res, next) {
  const options = {
    method: 'post',
    body: body,
    json: true,
    url: config.get('dataServer') + '/users/login'
  }
  request(options, function (error, response, body) {
    console.log(body)
    if (error) {
      res.json({
        success: false
      })
    } else {
      res.json(body);
    }
  })
})

router.post('/register', function (req, res, next) {
  const options = {
    method: 'post',
    body: body,
    json: true,
    url: config.get('dataServer') + '/users/register'
  }
  request(options, function (error, response, body) {
    console.log(body)
    if (error) {
      res.json({
        success: false
      })
    } else {
      res.json(body);
    }
  })
});

module.exports = router;
