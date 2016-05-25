var paginationHelper = function () {
  // http://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
  function range(count, start) {
    return Array.apply(null, Array(count))
    .map(function (item, index) {
      return index + start || 0;
    });
  }

  function getPageCount(total, perPage) {
    return Math.ceil(total / perPage);
  }

  function getLinks(options) {
    var pageCount = getPageCount(options.total, options.perPage);
    var pages = range(pageCount, 1);

    return pages.map(function (page) {
      return { url: options.url + page, text: page, active: page === +options.currentPage };
    });
  }

  return {
    getLinks: getLinks
  };
};

module.exports = paginationHelper();
