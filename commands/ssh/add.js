/**
 * @fileoverview Module handling the SSH key add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var fs = require('fs');

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
      if (argv.json) {
        console.log(key);
      } else {
        console.log('New SSH Key added.'.red);
        console.log('SSH Key ID: '.red + key.id);
        console.log('SSH Key Fingerprint: '.red + key.fingerprint);
      }
    });
  } catch (error) {
    Util.handleError(error);
  }
};
