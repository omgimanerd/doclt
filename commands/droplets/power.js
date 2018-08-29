/**
 * @fileoverview Module handling the droplet power subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../../lib/util')

exports.command = 'power'

exports.description = 'Reboot, power on, and power off a droplet'.yellow

exports.builder = yargs => {
  yargs.commandDir('power')
  util.globalConfig(yargs, 2, exports.command, true)
}
