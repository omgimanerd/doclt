/**
 * @fileoverview Module handling the domain record delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../../lib/util');

exports.command = 'delete <domain> <record id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a record'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.domains.deleteRecord(argv.domain, argv.recordid, (error) => {
    util.handleError(error, argv.json);
    var message = 'Domain record deleted';
    if (argv.json) {
      console.log({ message: message });
    } else {
      console.log(message.red);
    }
  });
};
