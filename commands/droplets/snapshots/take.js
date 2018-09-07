/**
 * @fileoverview Module handling the droplet snapshotting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'take <droplet id> <snapshot name>'

exports.aliases = ['create', 'add']

exports.description = 'Take a snapshot of a droplet'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs)
}

exports.handler = argv => {
  const client = util.getClient()
  client.droplets.snapshot(argv.dropletid, {
    name: argv.snapshotname
  }, (error, action) => {
    util.handleError(error)
    display.displayMessage('Taking a snapshot...')
    display.displayAction(action)
  })
}
