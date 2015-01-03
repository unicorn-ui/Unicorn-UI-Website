var Website = {

  init: function() {
    this.formatDates();
  },

  formatDates: function() {
    var dates = $('.article-date');

    if(dates.length) {
      _.each(dates, function(dateElement) {
        var $dateElement = $(dateElement);
        var currentTime = $dateElement.text();
        var prettyDate = moment(currentTime).format("MMM Do YYYY");

        $dateElement.text(prettyDate);
      });
    }
  }

};

Website.init();

module.exports = Website;