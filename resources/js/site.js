var Website = {

  init: function() {
    this.formatDates();
    this.trimCardText();
    this.formateCode();
    this.activateMobileNav();
  },

  trimCardText: function() {
    var cardText = $('.card-body p');

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
  },

  activateMobileNav: function() {
    var $button = $('.top-nav-menu-button');
    var $list = $('#top-nav-list');

    if($button.length && $list.length) {
      $button.on('click', function(e) {
        $(this).toggleClass('is-active');
        $list.toggleClass('is-visible');
      });
    }
  }
};

Website.init();

module.exports = Website;