/**
 * @fileoverview Module handling the domain record commands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const util = require('../../lib/util')

exports.command = 'records'

exports.aliases = ['record']

exports.description = 'Create, delete, and manage domain records'.yellow

exports.builder = yargs => {
  yargs.commandDir('records')
    .demandCommand()
  util.globalConfig(yargs)
}
