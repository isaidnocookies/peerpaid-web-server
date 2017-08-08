'use strict';

const passportCustom = require('passport-custom');

const fs = require('fs');
const path = require('path');

const authentication = require('feathers-authentication');

const jwt = require('feathers-authentication-jwt')

const other = require('./other');

const jwtkey = require('../../lib/jwtkey')

module.exports = function () {
  const app = this;


  const config = {
    secret: jwtkey.pub,
    strategies: [
      "jwt",
      "other"
    ],
    path: "/authentication",
    cookie: {
      enabled: false,
      name: 'feathers-jwt',
      httpOnly: false,
      secure: true
    },
    cookie: 'feathers-jwt',
    storageKey: 'feathers-jwt',
    cookie: 'feathers-jwt',
    jwt: {
      header: void 0,//{ typ: 'access' }, // by default is an access token but can be any type
      audience: void 0,//'https://yourdomain.com', // The resource server where the token is processed
      subject: void 0,//'anonymous', // Typically the entity id associated with the JWT
      issuer: void 0,//'feathers', // The issuing server, application or resource
      algorithm: 'RS256',
      expiresIn: '1d',
    },
    local: {
      entity: "user",
      service: "users",
      usernameField: "email",
      passwordField: "password"
    }
  }


  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(other());
  app.configure(jwt(config))

  //  app.configure(local(config.local));

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      all: [
      ],
      create: [
        (hook) => {
          hook.params.secret = "blah";
          hook.params.jwt = {}
          hook.params.jwt.algorithm = "HS256";
          return authentication.hooks.authenticate(config.strategies)(hook);
        },

      ],
      remove: [
        authentication.hooks.authenticate("jwt")
      ]
    },
    after: {
      create: [
        issueJWT()
      ]
    }
  });
};






const issueJWT = () => {
  return hook => {
    const app = hook.app;
    const id = hook.result.id;
    //console.log("hook:", hook.params.user.token)
    if (hook.params.user && hook.params.user.token) {
      hook.result.accessToken = hook.params.user.token;
    }
    // return app.passport.createJWT({ userId: id }, app.get('auth')).then(accessToken => {
    //   hook.result.accessToken = accessToken;
    return Promise.resolve(hook);
    // });
  };
};


// // Initialize the application
// var app = feathers();

// app.configure(rest())
//   .configure(socketio())
//   .configure(hooks())
//   // Needed for parsing bodies (login)
//   .use(bodyParser.json())
//   .use(bodyParser.urlencoded({ extended: true }))
//   // Configure feathers-authentication
//   .configure(auth({ secret: 'super secret' }))
//   .configure(jwt())
//   .use('/users', memory())
//   .use(errorHandler());



// // Authenticate the user using the default
// // email/password strategy and if successful
// // return a JWT.
// app.service('authentication').hooks({
//   before: {
//     create: [auth.hooks.authenticate('jwt')]
//   }
// });

// // Add a hook to the user service that automatically replaces
// // the password with a hash of the password before saving it.
// app.service('users').hooks({
//   before: {
//     find: [auth.hooks.authenticate('jwt')]
//   },
//   after: {
//     create: [issueJWT()]
//   }
// });

// // Create a user that we can use to log in
// var User = {
//   email: 'admin@feathersjs.com',
//   permissions: ['*']
// };

// app.service('users').create(User).then(user => {
//   console.log('Created default user', user);
// }).catch(console.error);

// app.listen(3030);

// console.log('Feathers authentication with local auth started on 127.0.0.1:3030');



