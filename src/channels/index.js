module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  var currencyAccountService = app.service('currency-accounts');
  var userService = app.service('users');
  var bitcoinTransactionService = app.service('bitcoin-transactions');
  var notificationService = app.service('notifications');



  app.on('connection', connection => {
    // On a new real-time connection, add it to the
    // anonymous channel
    app.channel('anonymous').join(connection);
  });


  app.on('login', (user, payload) => {
    var { connection } = payload;
    user = connection.user;
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);

      app.channel(`users/${user._id}`).join(connection);

      if (user.currencyAccounts) {
        currencyAccountService.find({
          query: {
            _id: {
              $in:
                user.currencyAccounts
            }
          }
        }).then(result => {

          result.data.forEach((currencyAccount) => {
            app.channel(`currencyAccounts/${currencyAccount.accountId}`).join(connection);
          });

        });
      }
      // Channels can be named anything and joined on any condition 
      // E.g. to send real-time events only to admins use

      // if(user.isAdmin) { app.channel('admins').join(conneciton); }

      // If the user has joined e.g. chat rooms

      // user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel))
    }
  });

  app.publish((data, hook) => { // eslint-disable-line no-unused-vars
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    // e.g. to publish all service events to all authenticated users use
    // return app.channel('authenticated');
  });

  // Here you can also add service specific event publishers
  // e..g the publish the `users` service `created` event to the `admins` channel

  // notificationService.publish((data, hook) => {
  //   var result = [
  //     app.channel('admin/listen/notifictation'),
  //     app.channel(`users/${data.ownerId}`),
  //   ];
  //   switch (data.notifyType) {
  //     case 'ALERT':
  //     case 'PRIVATE_MESSAGE':

  //       result = result.concat(app.channel(`users/${data.destinationId}`));
  //       break;
  //     case 'CHAT_MESSAGE':
  //       result = result.concat(app.channel(`rooms/${data.destinationId}`));
  //       break;
  //     case 'TRADE_MESSAGE':

  //       result = result.concat(app.channel(`trade/${data.destinationId}`));
  //       break;
  //     default:
  //       break;
  //   }

  //   return result;
  // });


  app.on('channels:exitChannel', (username, channel) => {
    app.channel('authenticated').connections.forEach((connection) => {
      if (connection.user.username === username) {
        app.channel(channel).leave(connection);
      }
    });
  });

  app.on('channels:partRoom', (username, roomId) => {
    app.channel('authenticated').connections.forEach((connection) => {
      if (connection.user.username === username) {
        app.channel('rooms/' + roomId);
      }
    });
  });
  // setTimeout(() => {
  //   app.emit('channels:exitChannel', 'user5', 'currencyAccounts/moCVFankQomSAfgWd2wCeBgzCeyMPmMB5C');
  //   console.log("Left the room")

  // }, 30000);


  bitcoinTransactionService.publish((data, hook) => {
    return app.channel(`currencyAccounts/${data.address}`);
  });


  userService.publish('created', (data, hook) => {
    return app.channel('admins');
  });



};
