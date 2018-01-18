
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

    let ip = '24.234.113.55';
    // let ip = '67.77.104.113';
    let geoipData = {};
    function callback(err, data) {
      if (err) {
        console.log(err);
      } else {
        let continent = data.continent.names.en;
        let country = data.country.iso_code;
        let postal = data.postal && data.postal.code;
        let state = data.most_specific_subdivision && data.most_specific_subdivision.names && data.most_specific_subdivision.names.en;
        let city = data.city && data.city.names && data.city.names.en;
        let ipAddress = data.traits && data.traits && data.traits.ip_address;
        // console.log('response from geoip', data);
        // console.log('response from geoip continent', continent);
        // console.log('response from geoip country', country);
        // console.log('response from geoip postal', postal);
        // console.log('response from geoip state', state);
        // console.log('data.city.name.en', city);
        // console.log('id check complete!!');
  
  
        geoipData = {
          continent: continent,
          country: country,
          state: state,
          city: city,
          postal: postal,
          ipAddress: ipAddress
        };

        console.log('response from geoip', data);
        console.log('response from geoip state', data.most_specific_subdivision.names.en);
        console.log('data.city.name.en', data.city.names.en);
        res.send({ geoipData: geoipData });
      }
    }

    insights(ip, callback);

    // res.send({ success: true });
    // res.status(404).send({ message: 'status 404'});
    // next();
  };
};
