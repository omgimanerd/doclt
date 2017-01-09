/**
 * @fileoverview Module handling the renaming of an SSH key.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'rename <key id> <name>';

exports.aliases = ['update'];

exports.description = 'Rename an SSH key'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.account.updateSshKey(argv.keyid, {
    name: argv.name
  }, (error) => {
    util.handleError(error);
    console.log('SSH Key renamed'.red);
  });
}
