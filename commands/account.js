/**
 * @fileoverview Module handling the account detail command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../lib/util');

exports.command = 'account';

exports.aliases = ['acc'];

exports.description = 'Display account information'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.account.get((error, account) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(account);
    } else {
      var Table = require('cli-table2');
      var table = new Table();
      table.push([{
        colSpan: 2,
        content: 'UUID: '.red + util.colorID(account.uuid)
      }]);
      table.push.apply(table, [
        ['Status', util.colorAccountStatus(account.status)],
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
