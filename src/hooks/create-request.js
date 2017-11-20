// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function createRequest(hook) {
    return new Promise((resolve, reject) => {
      var requestService = hook.app.service('requests');

      try {
        requestService.create({
          request: 'CREATE_DEPOSIT_ORDER',
          token: 'DATA',
          stage: '3DSLOCK_VERIFIED',
          owner: null,
          payload: hook.data
        }).then(() => {
          resolve(hook);
        });
      } catch (err) {
        reject(err);
      }

    });
  };
};
