var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  res.json({message:"this api is secure as proof by the jwt parameter", jwt:req.jwt});
});

module.exports = router;
