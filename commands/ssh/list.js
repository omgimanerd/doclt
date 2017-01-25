/**
 * @fileoverview Module handling the SSH key listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'list';

exports.aliases = ['ls'];

exports.description = 'List all SSH keys'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.account.listSshKeys((error, keys) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(keys);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['SSH Key Name', 'SSH Key ID']
      });
      table.push.apply(table, keys.map((key) => {
        return [key.name.blue, Util.colorID(key.id)];
      }));
      console.log(table.toString());
    }
  });
};
