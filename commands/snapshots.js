/**
 * @fileoverview Module handling the snapshot subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../lib/util');

exports.command = 'snapshots';

exports.aliases = ['snapshot'];

exports.description = 'Create, delete, and manage snapshots'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('snapshots')
    .demandCommand(1);
  util.globalConfig(yargs);
};
