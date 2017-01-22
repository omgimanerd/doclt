/**
 * @fileoverview Module handling the domain name add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'add <domain> <ip>';

exports.aliases = ['create'];

exports.description = 'Add a domain name'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.domains.create({
    name: argv.domain,
    ip_address: argv.ip
  }, (error, domain) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(domain);
    } else {
      console.log('New domain name added.'.red);
    }
  });
};
