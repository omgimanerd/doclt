/**
 * @fileoverview Module handling the droplet delete by tag command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const Display = require('../../lib/Display')
const Util = require('../../lib/Util')

exports.command = 'actionByTag <tag>'

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
  Util.globalConfig(yargs, 2, exports.command)
}

exports.handler = argv => {
  const client = Util.getClient()
  if (argv.action === 'delete') {
    client.droplets.deleteByTag(argv.tag, error => {
      Util.handleError(error)
      Display.displayMessage('Droplets with tag {0} deleted.', argv.tag)
    })
  } else {
    client.droplets.actionByTag(argv.tag, argv.action, (error, action) => {
      Util.handleError(error)
      Display.displayActionID(action, 'Executing action...')
    })
  }
}
