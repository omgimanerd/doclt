/**
 * @fileoverview Module handling the volume detach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const Util = require('../../lib/Util')

exports.command = 'detach <volume id>'

exports.description = 'Detach a volume'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.volumes.detach(argv.volumeid, (error, action) => {
    Util.handleError(error)
    display.displayMessage('Volume detached.')
    display.displayAction(action)
  })
}
