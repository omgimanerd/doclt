/**
 * @fileoverview Module handling the volume action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const Util = require('../../../lib/Util')

exports.command = 'get <volume id> <action id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a volume action'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 3, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  const volumeid = argv.volumeid
  const actionid = argv.actionid
  client.volumes.getAction(volumeid, actionid, (error, action) => {
    Util.handleError(error)
    display.displayAction(action)
  })
}
