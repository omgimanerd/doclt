/**
 * @fileoverview Module handling the account detail command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = 'account';

exports.aliases = ['acc'];

exports.description = 'Display account information'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.account.get((error, account) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(account);
    } else {
      var Table = require('cli-table2');
      var table = new Table();
      table.push([{
        colSpan: 2,
        content: 'UUID: '.red + Util.colorID(account.uuid)
      }]);
      table.push.apply(table, [
        ['Status', Util.colorAccountStatus(account.status)],
        ['Status message', account.status_message || 'none'],
        ['Email', account.email],
        ['Email verified', account.email_verified ? 'yes'.green : 'no'.red],
        ['Droplet Limit', account.droplet_limit],
        ['Floating IP Limit', account.floating_ip_limit]
      ].map((row) => [row[0].red, row[1]]));
      console.log(table.toString());
    }
  });
};
