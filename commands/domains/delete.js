/**
 * @fileoverview Module handling the domain name delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'delete <domain>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a domain name'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.domains.delete(argv.domain, (error) => {
    util.handleError(error);
    console.log('Domain name deleted.'.red);
  });
};
