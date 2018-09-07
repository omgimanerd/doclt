/**
 * @fileoverview Module handling the SSH key listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

const display = require('../../lib/display')
const util = require('../../lib/util')

exports.command = 'list'

exports.aliases = ['ls']

exports.description = 'List all SSH keys'.yellow

exports.builder = util.globalConfig

exports.handler = () => {
  const client = util.getClient()
  client.account.listSshKeys((error, keys) => {
    util.handleError(error)
    display.displaySshKeys(keys)
  })
}
