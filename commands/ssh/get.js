/**
 * @fileoverview Module handling the SSH key fetching command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'get <ssh key id>';

exports.description = 'Information about an SSH key';

exports.builder = (yargs) => {
  yargs.option('key', {
    description: 'Show only the public key'
  });
};

exports.handler = (argv) => {
  var Table = require('cli-table2');
  var colors = require('colors');
  var digitalocean = require('digitalocean');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  client.account.getSshKey(argv.sshkeyid, (error, key) => {
    util.handleError(error);
    if (argv.keyOnly) {
      console.log(key.public_key);
    } else {
      console.log('SSH Key Name: '.red + key.name);
      console.log('SSH Key ID: '.red + key.id);
      console.log('SSH Key Fingerprint: '.red + key.fingerprint);
      console.log('SSH Public Key: '.red + key.public_key);
    }
  });
};
