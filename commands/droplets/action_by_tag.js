/**
 * @fileoverview Module handling the droplet delete by tag command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'action_by_tag <tag>'

exports.description = 'Perform actions on droplets by tag'.yellow

exports.builder = yargs => {
  yargs.option('action', {
    description: 'The action to perform on the droplets'.yellow,
    required: true,
    choices: [
      'delete', 'power_cycle', 'power_on', 'shutdown',
      'enable_private_networking', 'enable_ipv6', 'enable_backups',
      'disable_backups', 'snapshot'
    ]
  }).group(['action'], 'Droplet Actions:')
  util.globalConfig(yargs)
}

exports.handler = argv => {
  const client = util.getClient()
  if (argv.action === 'delete') {
    client.droplets.deleteByTag(argv.tag, error => {
      util.handleError(error)
      display.displayMessage(`Droplets with tag ${argv.tag} deleted.`)
    })
  } else {
    client.droplets.actionByTag(argv.tag, argv.action, (error, action) => {
      util.handleError(error)
      display.displayMessage('Executing action...')
      display.displayActionID(action)
    })
  }
}
