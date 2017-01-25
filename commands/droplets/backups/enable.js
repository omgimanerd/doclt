/**
 * @fileoverview Module handling the enabling of automatic backups for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../../lib/Util');

exports.command = 'enable <droplet id>';

exports.aliases = ['on'];

exports.description = 'Enable automatic backups for a droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.enableBackups(argv.dropletid, (error, action) => {
    Util.handleError(error);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Automatic backups enabled.'.red);
      console.log('Action ID: '.red + Util.colorID(action.id));
    }
  });
};
