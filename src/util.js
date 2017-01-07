/**
 * @fileoverview Miscellaneous utility functions.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

module.exports.defaultJoin = function(dataList) {
  return dataList.join('\n').trim() || 'none';
};

module.exports.parseStatus = function(status) {
  switch (status) {
    case 'new':
    case 'off':
      return status.red;
      break;
    case 'active':
      return status.green;
      break;
    case 'archived':
      return status.blue;
      break;
  }
};
