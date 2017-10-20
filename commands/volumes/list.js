/**
 * @fileoverview Module handling the volume listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all volumes'.yellow

exports.builder = yargs => {
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = () => {
  const client = Util.getClient()
  client.volumes.list((error, volumes) => {
    Util.handleError(error)
    Display.displayVolumes(volumes)
  })
}
