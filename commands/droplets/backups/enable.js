/**
 * @fileoverview Module handling the enabling of automatic backups for droplets.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../../lib/util');

exports.command = 'enable <droplet id>';

exports.aliases = ['on'];

exports.description = 'Enable automatic backups for a droplet'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.enableBackups(argv.dropletid, (error, action) => {
    util.handleError(error);
    if (argv.json) {
      console.log(action);
    } else {
      console.log('Automatic backups enabled.'.red);
      console.log('Action ID: '.red + util.colorID(action.id));
    }
  });
};
