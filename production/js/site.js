/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Website = {

	  init: function() {
	    this.formatDates();
	    this.trimCardText();
	    this.formateCode();
	    this.activateMobileNav();
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

/***/ }
/******/ ]);