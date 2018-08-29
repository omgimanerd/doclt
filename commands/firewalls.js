/**
 * @fileoverview Module handling the firewall subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../lib/util')

exports.command = 'firewalls'

exports.aliases = ['firewall']

exports.description = 'Create delete and manage firewalls'.yellow

exports.builder = yargs => {
  yargs.commandDir('firewalls')
  util.globalConfig(yargs, 1, exports.command, true)
}
