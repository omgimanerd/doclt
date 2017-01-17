/**
 * @fileoverview Module handling the SSH key delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'delete <key id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete an SSH key'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.account.deleteSshKey(argv.keyid, (error, key, headers) => {
    util.handleError(error);
    console.log('SSH Key deleted.'.red);
  });
};
