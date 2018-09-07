/**
 * @fileoverview Module handling the droplet action listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'list <droplet id>'

exports.aliases = ['ls']

exports.description = 'List all actions performed on a droplet'.yellow

exports.builder = yargs => {
  yargs.option('limit', {
    description: 'The maximum number of actions to fetch'.yellow,
    number: true
  }).group(['limit'], 'Droplet Actions Options:')
  util.globalConfig(yargs)
}

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.listActions(argv.dropletid, (error, actions) => {
    util.handleError(error)
    display.displayActions(actions, argv.limit)
  })
}
