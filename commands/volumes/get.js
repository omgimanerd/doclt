/**
 * @fileoverview Module handling the volume getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'get <volume id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a volume'.yellow

exports.builder = yargs => {
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  client.volumes.get(argv.volumeid, (error, volume) => {
    util.handleError(error)
    display.displayVolume(volume)
  })
}
