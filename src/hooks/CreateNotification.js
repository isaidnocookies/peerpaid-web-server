
module.exports.CreateNotification = (options) => (hook) => {
  // console.log('createNotification hook.result:', hook.result);
  if (hook.data) {

    let type = options.notifyType || 'User';
    let message = options.notifyMessage || 'New Message';
    let link = options.infoLink || '/profile';
    
    if (typeof message === 'function'){
      message = message(hook);
    }

    hook.app.service('notifications').create({
      notifyType: `${type}`,
      notifyMessage: `${message}`,
      infoLink: `${link}`,
      owner: hook.result.owner
    }).then(result => {
      return hook;
    }).catch(error => {
      console.log('hook create error', error);
      return hook;
    });
    // console.log('user update hook data key', payloadKey)//[ 'userAvatar' ]
    // console.log('user update hook params', hook.params.user._id)
    return hook;
  }
  // return console.log('user update hook data', hook.data['$set'])
};