var Website = {

  init: function() {
    this.trimCardText();
    this.formatDates();
    this.formateCode();
  },

  trimCardText: function() {
    var cardText = $('.card-body p');
    console.log(cardText);

    if(cardText.length) {
      $.each(cardText, function(index, pargraph) {
        $clamp(pargraph, {clamp: '100px'});
      });
    }
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