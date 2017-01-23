/**
 * @fileoverview Module handling the domain record listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../../lib/util');

exports.command = 'list <domain>';

exports.aliases = ['ls'];

exports.description = 'List all records for a domain'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.domains.listRecords(argv.domain, (error, records) => {
    util.handleError(error, argv.json);
    if (argv.json) {
      console.log(records);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['ID', 'Type', 'Name', 'Data']
      });
      table.push.apply(table, records.map((record) => {
        var type = util.colorDomainType(record.type);
        return [util.colorID(record.id), type, record.name, record.data];
      }));
      console.log(table.toString());
    }
  });
};
