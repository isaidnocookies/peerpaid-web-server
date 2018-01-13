
const geoip2ws = require('geoip2ws');

const config = require('config');
var userId = config.get('geoipKeys.userId');
var licenseKey = config.get('geoipKeys.licenseKey');

const insights = new geoip2ws(userId, licenseKey, 'insights');

module.exports = function (options = {}) {
  return function geoip(req, res, next) {
    console.log('geoip middleware is running');
    // console.log('geoip req: ', req);
    console.log(`geoip req.protocol. `, req.protocol);
    console.log(`geoip req.hostname `, req.hostname);
    console.log(`geoip req.headers['x-forwarded-for'] `, req.headers['x-forwarded-for']);
    console.log(`geoip req.connection.remoteAddress `, req.connection.remoteAddress);
    console.log('geoip req.ip: ', req.ip);
    console.log('geoip req.ips: ', req.ips);
    console.log('geoip req.body: ', req.body);

    // let ip = '24.234.113.55';
    let ip = '67.77.104.113';

    function callback(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('response from geoip', data);
        console.log('response from geoip state', data.most_specific_subdivision.names.en);
        console.log('data.city.name.en', data.city.names.en);
        res.send({ tribe: true });
      }
    }

    insights(ip, callback);

    // res.send({ success: true });
    // res.status(404).send({ message: 'status 404'});
    // next();
  };
};
