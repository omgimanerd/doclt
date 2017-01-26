/**
 * @fileoverview Module handling the droplet creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var prompt = require('prompt');

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'add';

exports.aliases = ['create'];

exports.description = 'Create a new droplet'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 1, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  prompt.message = '';
  prompt.start();
  prompt.get({
    properties: {
      name: {
        description: 'Droplet name',
        required: true
      },
      region: {
        description: 'Region ID ("docli regions" to list regions)',
        required: true,
      },
      size: {
        description: 'Size ID ("docli sizes" to list sizes)',
        required: true
      },
      image: {
        description: 'Image ID or slug identifier',
        required: true
      },
      ssh_keys: {
        description: 'SSH Key IDs (comma separated) (optional)',
        before: Util.csvToArray
      },
      backups: {
        description: 'Enable backups? (true/false)',
        required: true,
        type: 'boolean'
      },
      ipv6: {
        description: 'Enable IPv6? (true/false)',
        required: true,
        type: 'boolean'
      },
      private_networking: {
        description: 'Enable private networking? (true/false)',
        required: true,
        type: 'boolean'
      },
      monitoring: {
        description: 'Enable monitoring? (true/false)',
        required: true,
        type: 'boolean'
      },
      user_data: {
        description: 'Desired user data (optional)'
      },
      volume: {
        description: 'Volume IDs to attach (comma separated) (optional)',
        before: Util.csvToArray,
      },
      tags: {
        description: 'Tags (comma separated) (optional)',
        before: Util.csvToArray
      }
    }
  }, (error, result) => {
    Util.handleError(error);
    client.droplets.create(result, (error, droplet) => {
      Util.handleError(error);
      Display.displayDroplet(droplet, 'Droplet created.');
    });
  });
};
