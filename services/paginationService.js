var paginationHelper = function () {
  function range(start, end) {
    var nums = [];
    var i;
    for (i = start; i <= end; i++) {
      nums.push(i);
    }
    return nums;
  }

  function getPageCount(total, perPage) {
    return Math.ceil(total / perPage);
  }

  function getLinks(options) {
    var pageCount = getPageCount(options.total, options.perPage);
    var pages = range(1, pageCount);

    return pages.map(function (page) {
      return { url: options.url + page, text: page, active: page === +options.currentPage };
    });
  }

  return {
    getLinks: getLinks
  };
};

module.exports = paginationHelper();
