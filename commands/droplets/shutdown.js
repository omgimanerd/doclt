/**
 * @fileoverview Module handling the droplet shutdown command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'shutdown <droplet id>';

exports.description = 'Gracefully shut down a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.shutdown(argv.dropletid, (error, action) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Shutting down droplet.'.red);
      console.log('Action ID: '.red + Util.colorID(action.id));
    }
  });
};
