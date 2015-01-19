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
      for(var i = 0, l = cardText.length; i < l; i++) {
        $clamp(cardText[i], {clamp: '100px'});
      }
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