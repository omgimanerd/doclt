/**
 * @fileoverview This module handlings displaying various DigitalOcean
 *   assets in a neat and orderly table.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Table = require('cli-table2');

var Util = require('./Util');

/**
 * Takes a list of actions and displays them.
 * @param {Array.<Object>} actions An array of volume/droplet actions
 * @param {?number} limit The maximum number of actions to display
 */
exports.displayActions = (actions, limit) => {
  if (Util.json()) {
    console.log(actions);
  } else {
    var table = new Table({ head: ['ID', 'Status', 'Type', 'Completed'] });
    if (typeof(limit) === 'number') {
      actions = actions.slice(0, argv.limit);
    }
    table.push.apply(table, actions.map((action) => {
      return [
        Util.colorID(action.id),
        Util.colorActionStatus(action.status),
        action.type,
        new Date(action.completed_at).toLocaleString()
      ];
    }));
    console.log(table.toString());
  }
};
