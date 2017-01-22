/**
 * @fileoverview Module handling the renaming of an SSH key.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'rename <key id> <name>';

exports.aliases = ['update'];

exports.description = 'Rename an SSH key'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.account.updateSshKey(argv.keyid, { name: argv.name }, (error) => {
    util.handleError(error, argv.json);
    var message = 'SSH Key renamed';
    if (argv.json) {
      console.log({ message: message }) ;
    } else {
      console.log(message.red);
    }
  });
}
