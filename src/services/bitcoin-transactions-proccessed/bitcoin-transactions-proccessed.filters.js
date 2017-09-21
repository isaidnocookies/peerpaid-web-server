/* eslint no-console: 1 */
console.warn('You are using the default filter for the bitcoinTransactions_proccessed service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) { // eslint-disable-line no-unused-vars
  console.log('conn-ws',connection);
  if (connection.currencyAccounts) {
    connection.currencyAccounts.forEach(account => {
      if (data.address !== account.accoundId) {
        console.log('check', data.address + ' --- ' + account.accoundId);
        return false;
      }
    });
  }
  return data;
};
