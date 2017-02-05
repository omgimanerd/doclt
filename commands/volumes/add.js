/**
 * @fileoverview Module handling the volume creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var prompt = require('prompt');

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'add';

exports.aliases = ['create'];

exports.description = 'Create a new volume'.yellow;

exports.builder = (yargs) => {
  var options = [
      'name', 'size_gigabytes', 'description', 'region', 'snapshot_id'];
  yargs.option('name', {
    description: 'Set the volume name'.yellow,
  }).option('size_gigabytes', {
    alias: ['size'],
    description: 'Set the volume size in gigabytes'.yellow,
    number: true
  }).option('description', {
    description: 'Set the volume description'.yellow
  }).option('region', {
    description: 'Set a volume region slug (do not specify a snapshot)'.yellow
  }).option('snapshot_id', {
    alias: ['snapshot', 'snapshots'],
    description: 'Set a volume snapshot ID (do not specify a region)'.yellow
  }).group(options, 'Volume Attributes:');
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();
  prompt.message = '';
  prompt.override = argv;
  prompt.start();
  prompt.get({
    properties: {
      name: {
        description: 'Volume name'.yellow,
        required: true
      },
      size_gigabytes: {
        description: 'Size (GB)',
        required: true,
        type: 'number'
      },
      description: {
        description: 'Description (optional)',
      },
      region: {
        description: 'Region slug (cannot be specified with a snapshot)'
      },
      snapshot_id: {
        description: 'Base snapshot ID (cannot be specified with a region)'
      }
    }
  }, (error, result) => {
    Util.handleError(error);
    client.volumes.create(result, (error, volume) => {
      Util.handleError(error);
      Display.displayVolume(volume, 'Volume created.');
    });
  })
};
