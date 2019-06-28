/**
 *
 * @param {Date} date
 * @param {String} format
 *
 * @return {String}
 */
const formatDate = (date, format) => {
  const ret = format.replace('h', date.getHours())
    .replace('m', date.getMinutes())
    .replace('s', date.getSeconds())
    .replace('ms', date.getMilliseconds())
    .replace('M', date.getMonth())
    .replace('Y', date.getFullYear())
    .replace('D', date.getDate());
  return ret;
};

module.exports = {
  formatDate,
};
