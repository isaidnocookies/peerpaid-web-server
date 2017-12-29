var Mailchimp = require('mailchimp-api-v3');

var api_key = '77ffe8c31d60c9375ba6d44f1ed91693-us17';
var mailchimp = new Mailchimp(api_key);

module.exports = function (options = {}) {
  return function subscribe(req, res, next) {
    // console.log('subscribe middleware is running');
    // console.log('req for /subscribe: ', req.body.email);

    mailchimp.post('/lists/886d3802d8/members', {
      email_address: req.body.email,
      status: 'subscribed'
    })
      .then(function (response) {
        // console.log('response for mailchimp POST: ',response);
        console.log('New member subscribed to mailchimp :)');
      })
      .catch(function (error) {
        console.log('mailchimp error, member not subscribed: ', error);
      });

    // res.redirect('/coming-soon');
    res.send({success: true});
    // next();
  };
};
