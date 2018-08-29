/**
 * @fileoverview Module handling the volume creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const prompt = require('prompt')

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'add'

exports.aliases = ['create']

exports.description = 'Create a new volume'.yellow

exports.builder = yargs => {
  const options = [
    'name', 'size_gigabytes', 'description', 'region', 'snapshot_id']
  yargs.option('name', {
    description: 'Set the volume name'.yellow
  }).option('size_gigabytes', {
    alias: ['size'],
    description: 'Set the volume size in gigabytes'.yellow,
    number: true
  }).option('description', {
    description: 'Set the volume description'.yellow
  }).option('region', {
    description: 'Set a volume region slug (do not specify a snapshot)'.yellow
  }).option('snapshot_id', {
    alias: ['snapshot', 'snapshots'],
    description: 'Set a volume snapshot ID (do not specify a region)'.yellow
  }).group(options, 'Volume Attributes:')
  util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = util.getClient()
  prompt.message = ''
  prompt.override = argv
  prompt.start()
  prompt.get({
    properties: {
      name: {
        description: 'Volume name'.yellow,
        required: true
      },
      // eslint-disable-next-line camelcase
      size_gigabytes: {
        description: 'Size (GB)',
        required: true,
        type: 'number'
      },
      description: {
        description: 'Description (optional)'
      },
      region: {
        description: 'Region slug (cannot be specified with a snapshot)'
      },
      // eslint-disable-next-line camelcase
      snapshot_id: {
        description: 'Base snapshot ID (cannot be specified with a region)'
      }
    }
  }, (error, result) => {
    util.handleError(error)
    client.volumes.create(result, (clientError, volume) => {
      util.handleError(clientError)
      display.displayMessage('Volume created.')
      display.displayVolume(volume)
    })
  })
}
