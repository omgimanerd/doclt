/**
 * @fileoverview Module handling the image action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../../lib/Display')
const Util = require('../../../lib/Util')

exports.command = 'get <image id> <action id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about an image action'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const imageid = argv.imageid
  const actionid = argv.actionid
  client.images.getAction(imageid, actionid, (error, action) => {
    Util.handleError(error)
    Display.displayAction(action)
  })
}
