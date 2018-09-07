/**
 * @fileoverview Module handling the image action getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../../lib/display')
const util = require('../../../lib/util')

exports.command = 'get <image id> <action id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about an image action'.yellow

exports.builder = util.globalConfig

exports.handler = argv => {
  const client = util.getClient()
  const imageid = argv.imageid
  const actionid = argv.actionid
  client.images.getAction(imageid, actionid, (error, action) => {
    util.handleError(error)
    display.displayAction(action)
  })
}
