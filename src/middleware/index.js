var requestService = require('./requestService');

const commandParser = require('./command-parser');

const ObjectID = require('mongodb').ObjectID;

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // in Express the order matters
  const app = this; // eslint-disable-line no-unused-vars
  // dataServer(app);
  // queue(app);
  requestService(app);


  app.use('/command', commandParser({ app }));

  app.post('/threeds', function (req, res) {
    var requests = app.service('requests');
    try {
      console.log(req.body);
      requests.create({
        request: 'CREATE_DEPOSIT_ORDER',
        token: 'DATA',
        stage: '3DSLOCK_VERIFIED',
        owner: ObjectID('aaffaaffaaffaaffaaffaaff'),
        payload: {
          MD: req.body.MD,
          PaRes: req.body.PaRes
        }
      }).then(() => {
        console.log(req.body);
        // The gateway should expect some kind of confirmation
        // But there is nothing about that in the doc. Still...
        res.sendStatus(200);
      });
    } catch (err) {
      console.log(err);
    }
  });
};
