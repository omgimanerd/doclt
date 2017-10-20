/**
 * @fileoverview Module handling the snapshot subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Util = require('../lib/Util')

exports.command = 'snapshots'

exports.aliases = ['snapshot']

exports.description = 'Create, delete, and manage snapshots'.yellow

exports.builder = yargs => {
  yargs.commandDir('snapshots')
  Util.globalConfig(yargs, 1, exports.command, true)
}
