/**
 * @fileoverview Module handling the SSH key add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

exports.command = 'add <name> <keyfile>';

exports.aliases = ['create'];

exports.description = 'Add an SSH key'.yellow;

exports.handler = (argv) => {
  var digitalocean = require('digitalocean');
  var fs = require('fs');

  var token = require('../../lib/token');
  var util = require('../../lib/util');
  var client = digitalocean.client(token.get());

  try {
    client.account.createSshKey({
      name: argv.name,
      public_key: fs.readFileSync(argv.keyfile, 'utf-8')
    }, (error, key) => {
      util.handleError(error);
      console.log('New SSH Key added.'.red);
      console.log('SSH Key ID: '.red + key.id);
      console.log('SSH Key Fingerprint: '.red + key.fingerprint);
    });
  } catch (error) {
    util.handleError(error);
  }
};
