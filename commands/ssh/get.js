/**
 * @fileoverview Module handling the SSH key fetching command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'get <key id>';

exports.aliases = ['i', 'info'];

exports.description = 'Information about an SSH key'.yellow;

exports.builder = (yargs) => {
  yargs.option('key', {
    description: 'Show only the public key'
  });
};

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.account.getSshKey(argv.keyid, (error, key) => {
    util.handleError(error);
    if (argv.key) {
      console.log(key.public_key);
    } else {
      console.log('SSH Key Name: '.red + key.name);
      console.log('SSH Key ID: '.red + key.id);
      console.log('SSH Key Fingerprint: '.red + key.fingerprint);
      console.log('SSH Public Key: '.red + key.public_key);
    }
  });
};
