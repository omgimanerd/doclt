/**
 * @fileoverview Module handling the volume action listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'list <image id>'

exports.aliases = ['ls']

exports.description = 'List all actions performed on an image'.yellow

exports.builder = yargs => {
  yargs.option('limit', {
    description: 'The maximum number of actions to fetch'.yellow,
    number: true
  }).group(['limit'], 'Image Action Options:')
  util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.images.listActions(argv.imageid, (error, actions) => {
    util.handleError(error)
    display.displayActions(actions, argv.limit)
  })
}
