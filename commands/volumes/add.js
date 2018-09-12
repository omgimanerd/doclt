/**
 * @fileoverview Module handling the volume creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

const OPTIONS = [
  'size_gigabytes', 'name', 'description', 'region', 'snapshot_id',
  'filesystem_type', 'filesystem_label'
]

exports.command = 'add'

exports.aliases = ['create']

exports.description = 'Create a new volume'.yellow

exports.builder = yargs => {
  yargs.option('size_gigabytes', {
    description: 'Set the volume size in gigabytes'.yellow,
    required: true,
    number: true
  }).option('name', {
    description: 'Set the volume name'.yellow,
    required: true
  }).option('description', {
    description: 'Set the volume description'.yellow
  }).option('region', {
    description: 'Set a volume region slug'.yellow
  }).option('snapshot_id', {
    description: 'Set a volume snapshot ID to create the volume with'.yellow
  }).option('filesystem_type', {
    description: 'Set the filesystem type'.yellow,
    choices: ['ext4', 'xfs']
  }).option('filesystem_label', {
    description: 'Set the label to apply to the filesystem'.yellow,
    implies: 'filesystem_type'
  }).group(OPTIONS, 'Volume Attributes:')
    .example(`$0 volumes add \\
      --name volume1 \\
      --size_gigabytes 2048`)
}

exports.handler = argv => {
  const client = util.getClient()
  const args = util.filterOptions(argv, OPTIONS)
  client.volumes.create(args, (error, volume) => {
    util.handleError(error)
    display.displayMessage('Volume created.')
    display.displayVolume(volume)
  })
}
