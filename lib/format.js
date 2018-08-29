/**
 * @fileoverview This module handles the formatting of data for
 *   display in a cli-table3 Table.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

/**
 * This takes an account status and colors it for output.
 * @param {string} status The account status to color
 * @return {string}
 */
exports.colorAccountStatus = status => {
  status = String(status)
  switch (status) {
  case 'active':
    return status.green
  case 'warning':
    return status.yellow
  case 'locked':
    return status.red
  }
  return status
}

/**
 * This takes a droplet action status and colors it for output.
 * @param {string} status The action status to color
 * @return {string}
 */
exports.colorActionStatus = status => {
  status = String(status)
  switch (status) {
  case 'completed':
    return status.green
  case 'in-progress':
    return status.yellow
  case 'errored':
    return status.red
  }
  return status
}

/**
 * This takes a certificate action status and colors it for output.
 * @param {string} status The certificate status to color
 * @return {string}
 */
exports.colorCertificateStatus = status => {
  status = String(status)
  switch (status) {
  case 'pending':
    return status.yellow
  case 'verified':
    return status.green
  case 'error':
    return status.red
  }
  return status
}

/**
 * This takes a domain type and colors it for output.
 * @param {string} type The domain type to color
 * @return {string}
 */
exports.colorDomainType = type => {
  type = String(type)
  switch (type) {
  case 'A':
    return type.yellow
  case 'AAAA':
    return type.blue
  case 'CNAME':
    return type.green
  case 'MX':
    return type.cyan
  case 'TXT':
    return type.magenta
  case 'SRV':
    return type.red
  case 'NS':
    return type.gray
  }
  return type
}

/**
 * This takes a droplet status and colors it for output.
 * @param {string} status The droplet status to color
 * @return {string}
 */
exports.colorDropletStatus = status => {
  status = String(status)
  switch (status) {
  case 'new':
  case 'off':
    return status.red
  case 'active':
    return status.green
  case 'archived':
    return status.blue
  }
  return status
}

/**
 * Colors any string designated as an ID.
 * @param {?string=} id The ID to color
 * @return {string}
 */
exports.colorID = id => {
  return id && id !== 'none' ? String(id).bold.cyan : 'none'
}

/**
 * Colors any string designated as a name.
 * @param {string} name The name to color
 * @return {string}
 */
exports.colorName = name => {
  return String(name).blue
}

/**
 * Colors the first element red in a series of rows for a table. Assumes the
 * given table has 2 or more rows.
 * @param {Array.<string>} rows Table rows to color
 * @return {Array.<string>}
 */
exports.colorTable = rows => {
  return rows.map(row => [row[0].red, row[1]])
}

/**
 * This function joins a list of values by newlines for display in cli-table3.
 * If the resulting string is empty, then it returns the string none.
 * @param {Array.<Object>} dataList A list of objects to display
 * @return {string}
 */
exports.defaultJoin = dataList => {
  return dataList.join('\n').trim() || 'none'
}

/**
 * Takes a date string and formats it for display.
 * @param {?string=} date The date as a string
 * @return {string}
 */
exports.formatDate = date => {
  return date ? new Date(date).toLocaleString() : 'n/a'
}

/**
 * Given a boolean status, this will return green yes or red no depending on the
 * status.
 * @param {boolean} status The status to check
 * @return {string}
 */
exports.formatStatus = status => {
  return status ? 'yes'.green : 'no'.red
}

/**
 * Takes a string and formats it with newlines such that each line is no
 * greater than a specified line length.
 * @param {string} text The text to format
 * @param {number} maxLineLength The maximum length of any line of text
 * @return {string}
 */
exports.formatTextWrap = (text, maxLineLength) => {
  const words = text.split(' ')
  let lineLength = 0
  let output = ''
  for (const word of words) {
    if (lineLength + word.length >= maxLineLength) {
      output += `\n${word} `
      lineLength = word.length + 1
    } else {
      output += `${word} `
      lineLength += word.length + 1
    }
  }
  return output
}
