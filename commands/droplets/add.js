/**
 * @fileoverview Module handling the droplet creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'add';

exports.aliases = ['create'];

exports.description = 'Create a new droplet'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');
  var prompt = require('prompt');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  prompt.message = '';
  prompt.start();
  prompt.get({
    properties: {
      name: { description: 'Droplet name', required: true },
      region: {
        description: 'Region ID ("docli regions" to list regions)',
        required: true,
      },
      size: {
        description: 'Size ID ("docli sizes" to list sizes)',
        required: true
      },
      image: { description: 'Image ID or slug identifier', required: true },
      ssh_keys: {
        description: 'SSH Key IDs (comma separated)',
        before: util.csvToArray
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
      user_data: { description: 'Desired user data' },
      volume: {
        description: 'Volume IDs to attach (comma separated)',
        before: util.csvToArray,
      },
      tags: {
        description: 'Tags (comma separated)',
        before: util.csvToArray
      }
    }
  }, (error, result) => {
    client.droplets.create(result, (error, data) => {
      util.handleError(error);
      console.log('Droplet created.'.red);
    });
  });
};
