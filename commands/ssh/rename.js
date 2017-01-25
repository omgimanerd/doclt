/**
 * @fileoverview Module handling the renaming of an SSH key.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'rename <key id> <name>';

exports.aliases = ['update'];

exports.description = 'Rename an SSH key'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.account.updateSshKey(argv.keyid, { name: argv.name }, (error, key) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(key) ;
    } else {
      console.log('SSH Key renamed.'.red);
      console.log('SSH Key Name: '.red + key.name);
      console.log('SSH Key ID: '.red + key.id);
      console.log('SSH Key Fingerprint: '.red + key.fingerprint);
      console.log('SSH Public Key: '.red + key.public_key);
    }
  });
}
