/**
 * @fileoverview Module handling the droplet resize command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'resize <droplet id> <size slug>'

exports.description = 'Resize a droplet'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.droplets.resize(argv.dropletid, argv.sizeslug, (error, action) => {
    Util.handleError(error)
    Display.displayMessage('Resizing droplet...')
    Display.displayActionID(action)
  })
}
