/**
 * @fileoverview This module manages the command line tool settings.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

// eslint-disable-next-line no-unused-vars
const colors = require('colors')
const fs = require('fs')
const path = require('path')
const os = require('os')

const configFile = path.join(os.homedir(), '.doclt_config.json')

/**
 * This function fetches and returns the DigitalOcean access token, if it was
 * supplied or set in an environment variable.
 * @return {string}
 */
exports.getToken = () => {
  if (process.env.DOCLT_TOKEN) {
    return process.env.DOCLT_TOKEN
  }
  try {
    // eslint-disable-next-line no-sync
    return JSON.parse(fs.readFileSync(configFile, 'utf-8')).token
  } catch (error) {
    console.log(error)
    console.error('DigitalOcean access token not available!'.red)
    console.error('Run "doclt token" to set your access token or set a '.red +
      'DOCLT_TOKEN environment variable'.red)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }
}

/**
 * This function sets the DigitalOcean access token.
 * @param {string} token The DigitalOcean access token
 * @param {function} callback The callback function
 */
exports.setToken = (token, callback) => {
  try {
    let config = {}
    try {
      // eslint-disable-next-line no-sync
      config = JSON.parse(fs.readFileSync(configFile, 'utf-8'))
    } catch (error) {
      config.token = token
    }
    // eslint-disable-next-line no-sync
    fs.writeFileSync(configFile, JSON.stringify(config), { mode: 0o600 })
    callback(null)
  } catch (error) {
    callback(error)
  }
}
