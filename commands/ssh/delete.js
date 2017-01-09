/**
 * @fileoverview Module handling the SSH key delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var colors = require('colors');

exports.command = 'delete <key id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete an SSH key'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.account.deleteSshKey(argv.keyid, (error, key, headers) => {
    util.handleError(error);
    console.log('SSH Key deleted.'.red);
  });
};
