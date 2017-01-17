/**
 * @fileoverview Module handling the volume delete command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'delete <volume id>';

exports.aliases = ['remove', 'del', 'rm'];

exports.description = 'Delete a volume'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.volumes.delete(argv.volumeid, (error) => {
    util.handleError(error);
    console.log('Volume deleted.'.red);
  });
};
