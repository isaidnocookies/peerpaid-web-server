const express = require('express')
const router = express.Router()
const request = require('request')
const config = require('config')

/* GET users listing. */
router.post('/token', function(req, res, next) {
    if (req.body.username !== '' && req.body.password !== '') {
        console.log(req.body.username, req.body.password)
        const options = {
            method: 'post',
            body: {username: req.body.username, password: req.body.password},
            json: true,
            url: config.get('dataServer') + '/login'
        }
        request(options, function(error, response, body) {
            console.log(body)
            if (error) {
                res.json({
                    success: false
                })
            } else {
                res.json(body);
            }
        })
    }
});

module.exports = router;
