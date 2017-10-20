/**
 * @fileoverview Module handling the volume getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'get <volume id>'

exports.aliases = ['i', 'info']

exports.description = 'Info about a volume'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  client.volumes.get(argv.volumeid, (error, volume) => {
    Util.handleError(error)
    Display.displayVolume(volume)
  })
}
