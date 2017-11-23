


var deployment = process.env.NODE_ENV;


module.exports = function () {
  if (deployment === 'production') return;
  var args = Object.assign([],arguments);
  args.splice(0,0,'DEBUG::');
  // eslint-disable-next-line no-console
  console.log.apply(this, args);
};

module.exports.stack = function () {
  if (deployment === 'production') return;
  var args = [];
  for (var i = 0; i < arguments.length; i++){
    args.push(arguments[i]);
  }
  args.push(new Error().stack);
  // eslint-disable-next-line no-console
  module.exports.apply(this, args);
};

module.exports.trace = module.exports.stack;