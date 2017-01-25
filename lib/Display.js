/**
 * @fileoverview This module handlings displaying various DigitalOcean
 *   assets in a neat and orderly table.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Table = require('cli-table2');

var Util = require('./Util');

/**
 * Colors the first element red in a series of rows for a table.
 * @param {Array.<string>} rows Table rows to color
 * @return {Array.<string>}
 */
var colorTable = (rows) => {
  return rows.map((row) => [row[0].red, row[1]]);
};

/**
 * If an error occurred in the process of accessing the DigitalOcean API, we
 * will output it in red to the console and then exit.
 * @param {?Error=} error The error to display
 */
var handleError = (error) => {
  if (error) {
    if (Util.json()) {
      console.log(JSON.stringify(error));
    } else {
      console.log(error.message.red);
    }
    process.exit(1);
  }
};

/**
 * Takes a single action from a droplet/volume action and displays it.
 * @param {?Error} error The error, if there was one
 * @param {Object} action The action to display
 */
exports.displayAction = (error, action) => {
  handleError(error);
  if (Util.json()) {
    console.log(action);
  } else {
    var table = new Table();
    table.push.apply(table, colorTable([
      ['Action ID', Util.colorID(action.id)],
      ['Action Status', Util.colorActionStatus(action.status)],
      ['Action Type', action.type],
      ['Started At', new Date(action.started_at).toLocaleString()],
      ['Completed At', new Date(action.completed_at).toLocaleString()],
      ['Resource Type', action.resource_type],
      ['Resource ID', Util.colorID(action.resource_id)],
      ['Resource Region', action.region_slug]
    ]));
    console.log(table.toString());
  }
};

/**
 * Takes a list of actions and displays them.
 * @param {Array.<Object>} actions An array of volume/droplet actions
 * @param {?number} limit The maximum number of actions to display
 */
exports.displayActions = (error, actions, limit) => {
  handleError(error);
  if (typeof(limit) === 'number') {
    actions = actions.slice(0, argv.limit);
  }
  if (Util.json()) {
    console.log(actions);
  } else {
    var table = new Table({ head: ['ID', 'Status', 'Type', 'Completed'] });
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
