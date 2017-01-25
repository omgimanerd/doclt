/**
 * @fileoverview Module handling the domain record getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../../lib/Util');

exports.command = 'get <domain> <record id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a domain record'.yellow;

exports.builder = (yargs) => {
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.domains.getRecord(argv.domain, argv.recordid, (error, record) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(record);
    } else {
      console.log('Domain Record ID: '.red + record.id);
      console.log('Domain Record Type: '.red + record.type);
      console.log('Domain Record Name: '.red + record.name);
      console.log('Domain Record Data: '.red + record.data);
      console.log('Domain Record Priority: '.red + record.priority);
      console.log('Domain Record Port: '.red + record.port);
      console.log('Domain Record Weight: '.red + record.weight);
    }
  });
};
