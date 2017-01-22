/**
 * @fileoverview Module handling the SSH key getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'get <key id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about an SSH key'.yellow;

exports.builder = (yargs) => {
  yargs.option('key', {
    description: 'Show only the public key'
  });
  util.globalconfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.account.getSshKey(argv.keyid, (error, key) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(key);
    } else if (argv.key) {
      console.log(key.public_key);
    } else {
      console.log('SSH Key Name: '.red + key.name);
      console.log('SSH Key ID: '.red + key.id);
      console.log('SSH Key Fingerprint: '.red + key.fingerprint);
      console.log('SSH Public Key: '.red + key.public_key);
    }
  });
};
