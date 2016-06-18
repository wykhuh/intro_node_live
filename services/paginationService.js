var paginationService = function() {

  // get the total number of pages
  function getPageCount(total, perPage) {
    // use ceiling not round because I want it to round up
    return Math.ceil(total / perPage);
  }


  // create an array of page numbers
  function range(number) {
    var i;
    var nums = [];
    for (i = 1; i <= number; i++) {
      nums.push(i);
    }
    return nums;
  }

  // create link for each page number
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
