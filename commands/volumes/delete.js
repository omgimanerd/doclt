/**
 * @fileoverview Module handling the volume delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'delete <volume id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a volume'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.volumes.delete(argv.volumeid, (error) => {
    util.handleError(error);
    console.log('Volume deleted.'.red);
  });
};
