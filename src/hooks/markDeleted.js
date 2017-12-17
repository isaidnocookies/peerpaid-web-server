
const { getFirstItem } = require('../lib/common');
const debug = require('../lib/debug');

module.exports.markDeleted = (options) => (hook) => {
  return new Promise((resolve, reject) => {
    // console.log('hook.id',hook.id);
    // debug("Hook", smallHook);
    let serviceName = options.serviceName;
  
    if(serviceName !== undefined) {
      hook.app.service(serviceName).patch(hook.id, { $set: { 'deleted': true } }, { query: hook.params.query }).then(serviceResult => {
        let firstServiceName = getFirstItem(serviceResult);
        // console.log('serviceResult', serviceResult);
        // console.log('firstServiceName', firstServiceName);
        hook.result = firstServiceName || {};
        // debug('Hook.result:', hook.result);
        resolve(hook);
      }).catch(error => {
        debug('Error:', error);
        hook.result = {};
        resolve(hook);
      });
    } else {
      return reject(new Error('No serviceName option, please provide one : { serviceName : notifications }'));
    }
  });
};