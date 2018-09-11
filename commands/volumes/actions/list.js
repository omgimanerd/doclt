/**
 * @fileoverview Module handling the volume action listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'list <volume id>'

exports.aliases = ['ls']

exports.description = 'List all actions performed on a volume'.yellow

exports.builder = yargs => {
  yargs.option('limit', {
    description: 'The maximum number of actions to fetch'.yellow,
    number: true
  }).group(['limit'], 'Volume Action Options:')
}

exports.handler = argv => {
  const client = util.getClient()
  client.volumes.listActions(argv.volumeid, (error, actions) => {
    util.handleError(error)
    display.displayActions(actions, argv.limit)
  })
}
