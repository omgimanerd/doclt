/**
 * @fileoverview Module handling the domain name getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../lib/Util');

exports.command = 'get <domain>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a domain name'.yellow;

exports.builder = (yargs) => {
  yargs.option('zone-file', {
    description: 'Show only the zone file'
  });
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.domains.get(argv.domain, (error, domain) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(domain);
    } else if (argv.zoneFile) {
      console.log(domain.zone_file);
    } else {
      console.log('Domain Name: '.red + domain.name);
      console.log('TTL: '.red + domain.ttl);
      console.log('Zone File:\n'.red + domain.zone_file);
    }
  });
};
