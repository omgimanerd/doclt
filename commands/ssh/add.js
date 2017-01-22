/**
 * @fileoverview Module handling the SSH key add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var fs = require('fs');

var util = require('../../lib/util');

exports.command = 'add <name> <keyfile>';

exports.aliases = ['create'];

exports.description = 'Add an SSH key'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  try {
    client.account.createSshKey({
      name: argv.name,
      public_key: fs.readFileSync(argv.keyfile, 'utf-8')
    }, (error, key) => {
      util.handleError(error, argv.json);
      if (argv.json) {
        console.log(key);
      } else {
        console.log('New SSH Key added.'.red);
        console.log('SSH Key ID: '.red + key.id);
        console.log('SSH Key Fingerprint: '.red + key.fingerprint);
      }
    });
  } catch (error) {
    util.handleError(error, argv.json);
  }
};
