var moment = require('moment');

var dateFormatService = function () {
  function formatDate(date, format) {
    return moment(date).format(format);
  }

  function formatRelativeDate(date) {
    var recentDate = moment().subtract(1, 'months').isBefore(date);
    if (recentDate) {
      return 'Updated ' + moment(date, 'YYYY-MM-DD').fromNow();
    } else {
      return 'Updated on ' + moment(date).format('MMM DD, YYYY');
    }
  }

  function currentYear() {
    return moment().year();
  }

  return {
    formatDate: formatDate,
    formatRelativeDate: formatRelativeDate,
    currentYear: currentYear
  };
};

module.exports = dateFormatService();
