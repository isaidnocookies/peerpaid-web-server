
module.exports.restrictToUndeleted = (hook) => {
  if (hook.params.provider) {
    hook.params.query['deleted'] = { $in: [null, false] };
  }
  return hook;
};