/**
 * @fileoverview Module handling the SSH key add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var fs = require('fs');

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'add <name> <keyfile>';

exports.aliases = ['create'];

exports.description = 'Add an SSH key'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  try {
    client.account.createSshKey({
      name: argv.name,
      public_key: fs.readFileSync(argv.keyfile, 'utf-8')
    }, (error, key) => {
      Util.handleError(error);
      Display.displaySshKey(key, false, 'New SSH Key added.');
    });
  } catch (error) {
    Util.handleError(error);
  }
};
