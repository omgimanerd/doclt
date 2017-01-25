/**
 * @fileoverview This module handlings displaying various DigitalOcean
 *   assets in a neat and orderly table.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Table = require('cli-table2');

var Util = require('./Util');

/**
 * @private
 * Colors the first element red in a series of rows for a table.
 * @param {Array.<string>} rows Table rows to color
 * @return {Array.<string>}
 */
var colorTable = (rows) => {
  return rows.map((row) => [row[0].red, row[1]]);
};

/**
 * Displays a single droplet/volume action.
 * @param {?Error} error An error, if one was thrown
 * @param {Object} action The action to display
 */
exports.displayAction = (error, action) => {
  Util.handleError(error);
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
 * Displays a droplet/volume action's ID.
 * @param {?Error} error An error, if one was thrown
 * @param {Object} action The action to display
 */
exports.displayActionID = (error, action) => {
  Util.handleError(error);
  if (Util.json()) {
    console.log(action);
  } else {
    console.log('Action ID: '.red + Util.colorID(action.id));
  }
};

/**
 * Displays a list droplet/volume actions.
 * @param {?Error} error An error, if one was thrown
 * @param {Array.<Object>} actions The volume/droplet actions to display
 * @param {?number} limit The maximum number of actions to display
 */
exports.displayActions = (error, actions, limit) => {
  Util.handleError(error);
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

/**
 * Displays a domain record.
 * @param {?Error} error An error, if one was thrown
 * @param {Object} record The domain record to display
 */
exports.displayDomainRecord = (error, record) => {
  Util.handleError(error);
  if (Util.json()) {
    console.log(record);
  } else {
    var table = new Table();
    table.push.apply(table, colorTable([
      ['ID', Util.colorID(record.id)],
      ['Type', Util.colorDomainType(record.type)],
      ['Name', record.name],
      ['Data', record.data],
      ['Priority', record.priority || 'none'],
      ['Port', record.port || 'none'],
      ['Weight', record.weight || 'none']
    ]));
    console.log(table.toString());
  }
};

/**
 * Displays a list of domain records.
 * @param {?Error} error An error, if one was thrown
 * @param {Array.<Object>} records The list of domain records to display
 * @return {[type]}
 */
exports.displayDomainRecords = (error, records) => {
  Util.handleError(error);
  if (Util.json()) {
    console.log(records);
  } else {
    var table = new Table({ head: ['ID', 'Type', 'Name', 'Data'] });
    table.push.apply(table, records.map((record) => {
      var type = Util.colorDomainType(record.type);
      return [Util.colorID(record.id), type, record.name, record.data];
    }));
    console.log(table.toString());
  }
};

/**
 * Displays a list of images (backups/snapshots/etc).
 * @param {?Error} error An error, if one was thrown
 * @param {Object} images The list of images to display
 */
exports.displayImages = (error, images) => {
  Util.handleError(error);
  if (Util.json()) {
    console.log(images);
  } else {
    var table = new Table({
      head: ['ID', 'Name', 'Minimum Size', 'Created At']
    });
    table.push.apply(table, images.map((image) => {
      return [
        Util.colorID(image.id),
        image.name.blue,
        new Date(image.created_at).toLocaleString()
      ];
    }));
    console.log(table.toString());
  }
};

/**
 * Displays a message upon completion of an action.
 * @param {?Error} error An error, if one was thrown
 * @param {string} message The message to display
 */
exports.displayMessage = (error, message) => {
  Util.handleError(error);
  if (Util.json()) {
    console.log({ message: message });
  } else {
    console.log(message.red);
  }
};
