/**
 * @fileoverview Module handling the volume getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'get <volume id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a volume'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  client.volumes.get(argv.volumeid, (error, volume) => {
    Util.handleError(error);
    Display.displayVolume(volume);
  });
};
