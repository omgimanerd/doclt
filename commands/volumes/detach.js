/**
 * @fileoverview Module handling the volume detach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'detach <volume id>'

exports.description = 'Detach a volume'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs)
}

exports.handler = argv => {
  const client = util.getClient()
  client.volumes.detach(argv.volumeid, (error, action) => {
    util.handleError(error)
    display.displayMessage('Volume detached.')
    display.displayAction(action)
  })
}
