/**
 * @fileoverview Module handling the droplet delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'delete <droplet id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a droplet'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.delete(argv.dropletid, (error) => {
    util.handleError(error);
    console.log('Droplet deleted.'.red);
  });
};
