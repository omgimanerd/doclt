/**
 * @fileoverview Module handling the volume creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var prompt = require('prompt');

var Util = require('../../lib/Util');

exports.command = 'add';

exports.aliases = ['create'];

exports.description = 'Create a new volume'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  prompt.message = '';
  prompt.start();
  prompt.get({
    properties: {
      name: {
        description: 'Volume name',
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
        description: 'Region ID (optional, cannot be specified with a snapshot)'
      },
      snapshot_id: {
        description: 'Snapshot ID (optional, cannot be specified with a region)'
      }
    }
  }, (error, result) => {
    Util.handleError(error);
    client.volumes.create(result, (error, volume) => {
      Util.handleError(error);
      if (argv.json) {
        console.log(volume);
      } else {
        console.log('Volume created,'.red);
        console.log('Volume ID: '.red + Util.colorID(volume.id));
      }
    });
  })
};
