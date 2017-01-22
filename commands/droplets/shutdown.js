/**
 * @fileoverview Module handling the droplet shutdown command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'shutdown <droplet id>';

exports.description = 'Gracefully shut down a droplet'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.shutdown(argv.dropletid, (error, action) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Shutting down droplet.'.red);
      console.log('Action ID: '.red + action.id.toString().bold.cyan);
    }
  });
};
