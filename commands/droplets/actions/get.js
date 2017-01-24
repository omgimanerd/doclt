/**
 * @fileoverview Module handling the droplet action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../../lib/util');

exports.command = 'get <droplet id> <action id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a droplet action'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.droplets.getAction(argv.dropletid, argv.actionid, (error, action) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(action);
    } else {
      var Table = require('cli-table2');
      var table = new Table();
      table.push.apply(table, [
        ['Action ID', util.colorID(action.id)],
        ['Action Status', util.colorActionStatus(action.status)],
        ['Action Type', action.type],
        ['Started At', new Date(action.started_at).toLocaleString()],
        ['Completed At', new Date(action.completed_at).toLocaleString()],
        ['Resource Type', action.resource_type],
        ['Resource ID', util.colorID(action.resource_id)],
        ['Resource Region', action.region_slug]
      ].map((row) => [row[0].red, row[1]]));
      console.log(table.toString());
    }
  });
};
