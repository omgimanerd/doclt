/**
 * @fileoverview Module handling the domain record commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'records';

exports.aliases = ['record'];

exports.description = 'Create, delete, and manage domain records'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('records')
    .demandCommand(1);
  util.globalConfig(yargs);
};
