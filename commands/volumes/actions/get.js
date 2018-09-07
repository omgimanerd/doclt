/**
 * @fileoverview Module handling the volume action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'get <volume id> <action id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a volume action'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs)
}

exports.handler = argv => {
  const client = util.getClient()
  const volumeid = argv.volumeid
  const actionid = argv.actionid
  client.volumes.getAction(volumeid, actionid, (error, action) => {
    util.handleError(error)
    display.displayAction(action)
  })
}
