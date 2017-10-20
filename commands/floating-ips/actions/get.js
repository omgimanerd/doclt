/**
 * @fileoverview Module handling the floating IP action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../../lib/Display')
const Util = require('../../../lib/Util')

exports.command = 'get <floating ip> <action id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a floating IP action'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const ip = argv.floatingip
  const id = argv.actionid
  client.floatingIps.getAction(ip, id, (error, action) => {
    Util.handleError(error)
    Display.displayAction(action)
  })
}
