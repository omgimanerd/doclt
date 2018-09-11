/**
 * @fileoverview Miscellaneous utility functions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

// eslint-disable-next-line no-unused-vars
const colors = require('colors')
const digitalocean = require('digitalocean')
const os = require('os')

const config = require('./config')

/**
 * Turns a string of comma separated values into an array of values.
 * @param {string} string A string of comma separated values
 * @return {Array.<string>}
 */
const csvToArray = string => {
  return string ? string.split(',')
    .map(v => v.trim())
    .filter(v => v !== '') : []
}

/**
 * Turns a string of comma separated key:value pairs into a JSON object.
 * This function assumes the given string is valid.
 * @param {string} string A string of comma separated key:value pairs
 * @return {Object}
 */
const csvToObject = string => {
  /*
   * Because these will be command line arguments, there should never be spaces
   * in string. If there are spaces, yargs.js/prompt.js/I might have fucked
   * something up and so we will just be safe and return an empty object.
   */
  string = String(string)
  if (string.indexOf(' ') !== -1) {
    return {}
  }
  const object = {}
  string.split(',').forEach(pair => {
    const keyValue = pair.split(':')
    if (keyValue.length === 2 && keyValue[0] && keyValue[1]) {
      object[keyValue[0]] = keyValue[1]
    }
  })
  return object
}

/**
 * Returns an instance of an authenticated DigitalOcean client.
 * @return {Object}
 */
const getClient = () => {
  return digitalocean.client(config.getToken())
}

/**
 * If an error occurred in the CLI, output a comprehensive error message to the
 * user so that they can file an issue for us.
 * @param {?Error=} error The error, if one was thrown
 */
const handleFail = error => {
  if (error) {
    console.error('An unexpected error occurred! Please open an issue at:'.red)
    console.error('https://github.com/omgimanerd/doclt/issues'.green)
    console.error('Copy this error message into it:'.red)
    console.error('------------------------------------------')
    console.error(`Node Version: ${process.version}`)
    console.error(`Platform: ${process.platform} ${os.release()}`)
    console.error(`Processor Architecture: ${process.arch}`)
    console.error(error)
    console.error('------------------------------------------')
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }
}

/**
 * If an error occurred in the process of accessing the DigitalOcean API, we
 * will output it in red to the console and then exit.
 * @param {?Error} error The error to display
 */
const handleError = error => {
  if (error) {
    if (process.argv.indexOf('--json') !== -1) {
      console.log(JSON.stringify(error))
    } else {
      console.log(error.message.red)
    }
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }
}

/**
 * This function parses a string representing a forwarding rule in the format
 * protocol:port and returns an object containing the protocol and port.
 * @param {string} rule The forwarding rule to parse
 * @return {Object}
 */
const parseForwardingRule = rule => {
  const re = /^(http|https|http2|tcp):([0-9]+)$/
  const matches = (String(rule).match(re) || []).slice(1, 3)
  return {
    protocol: matches[0] ? matches[0] : null,
    port: isNaN(matches[1]) ? null : parseInt(matches[1], 10)
  }
}

module.exports = exports = {
  csvToArray,
  csvToObject,
  getClient,
  handleError,
  handleFail,
  parseForwardingRule
}
