var moment = require('moment');

var dateFormatService = function () {
  function formatDate(date, format) {
    return moment(date).format(format);
  }

  return {
    formatDate: formatDate
  };
};

module.exports = dateFormatService();
