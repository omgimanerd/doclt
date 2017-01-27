/**
 * @fileoverview Module handling the domain name add command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'add <domain> <ip>';

exports.aliases = ['create'];

exports.description = 'Add a domain name'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.domains.create({
    name: argv.domain,
    ip_address: argv.ip
  }, (error, domain) => {
    Util.handleError(error);
    Display.displayDomain(domain, false, 'New domain name added.');
  });
};
