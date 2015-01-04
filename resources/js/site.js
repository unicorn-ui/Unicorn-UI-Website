var Website = {

  init: function() {
    this.formatDates();
    this.formateCode();
  },

  formatDates: function() {
    var dates = $('.article-date');

    if(dates.length) {
      _.each(dates, function(dateElement) {
        var $dateElement = $(dateElement);
        var currentTime = $dateElement.text();
        var prettyDate = moment(currentTime).format("LL");

        $dateElement.text(prettyDate);
      });
    }
  },

  formateCode: function() {
    $('pre').addClass('prettyprint linenums');
    prettyPrint();
  }

};

Website.init();

module.exports = Website;