/**
 * @fileoverview Module handling the volume listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all volumes'.yellow

exports.handler = () => {
  const client = util.getClient()
  client.volumes.list((error, volumes) => {
    util.handleError(error)
    display.displayVolumes(volumes)
  })
}
