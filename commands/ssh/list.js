/**
 * @fileoverview Module handling the SSH key listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all SSH keys'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.account.listSshKeys((error, keys) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(keys);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['SSH Key Name', 'SSH Key ID']
      });
      table.push.apply(table, keys.map((key) => {
        return [key.name.blue, key.id.toString().bold.cyan];
      }));
      console.log(table.toString());
    }
  });
};
