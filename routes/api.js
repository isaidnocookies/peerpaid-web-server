const express = require('express')
const router = express.Router()
const request = require('request')
const config = require('config')

const users = require('./api/users');


/* GET users listing. */
// router.post('/token', function(req, res, next) {
//     if (req.body.username !== '' && req.body.password !== '') {
//         const options = {
//             method: 'post',
//             body: {username: req.body.username, password: req.body.password},
//             json: true,
//             url: config.get('dataServer') + '/login'
//         }
//         request(options, function(error, response, body) {
//             if (error) {
//                 res.json({
//                     success: false
//                 })
//             } else {
//                 res.json(body);
//             }
//         })
//     }
// });

router.use("/users", users);

module.exports = router;
