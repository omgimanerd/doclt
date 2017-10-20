/**
 * @fileoverview Module handling the volume action listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../../lib/Display')
const Util = require('../../../lib/Util')

exports.command = 'list <volume id>'

exports.aliases = ['ls']

exports.description = 'List all actions performed on a volume'.yellow

exports.builder = yargs => {
  yargs.option('limit', {
    description: 'The maximum number of actions to fetch'.yellow,
    number: true
  }).group(['limit'], 'Volume Action Options:')
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.volumes.listActions(argv.volumeid, (error, actions) => {
    Util.handleError(error)
    Display.displayActions(actions, argv.limit)
  })
}
