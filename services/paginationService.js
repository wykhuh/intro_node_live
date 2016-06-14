var paginationService = function() {

  function getPageCount(total, perPage) {
    return Math.ceil(total / perPage);
  }

  function range(number) {
    var i;
    var nums = [];
    for (i = 1; i <= number; i++) {
      nums.push(i);
    }
    return nums;
  }

  function createLinks(total) {
    var pageCount = getPageCount(total, 30);
    var pages = range(pageCount);

    return pages.map(function (page) {
      //  url: 'https://api.github.com/users/wykhuh/repos?page=
      return { url: '/projects?page=' + page, text: page };
    });
  }

  return {
    createLinks: createLinks
  }
;};

module.exports = paginationService();
