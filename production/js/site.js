/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	module.exports = __webpack_require__(11);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Project: Buttons
	 *  Description: A highly customizable CSS button library built with Sass and Compass
	 *  Author: Alex Wolfe
	 *  License: Apache License v2.0
	 */

	// the semi-colon before function invocation is a safety net against concatenated
	// scripts and/or other plugins which may not be closed properly.
	;(function ( $, window, document, undefined ) {
	    'use strict';

	    // undefined is used here as the undefined global variable in ECMAScript 3 is
	    // mutable (ie. it can be changed by someone else). undefined isn't really being
	    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
	    // can no longer be modified.

	    // window and document are passed through as local variable rather than global
	    // as this (slightly) quickens the resolution process and can be more efficiently
	    // minified (especially when both are regularly referenced in your plugin).

	    // Create the defaults once
	    var menuButton = 'menuButton';
	    var defaults = {
	        propertyName: 'value'
	    };

	    // The actual plugin constructor
	    function Plugin( element, options ) {

	        //SET OPTIONS
	        this.options = $.extend( {}, defaults, options );
	        this._defaults = defaults;
	        this._name = menuButton;

	        //REGISTER ELEMENT
	        this.$element = $(element);

	        //INITIALIZE
	        this.init();
	    }

	    Plugin.prototype = {
	        constructor: Plugin,

	        init: function() {
	            // WE DON'T STOP PROPGATION SO CLICKS WILL AUTOMATICALLY
	            // TOGGLE AND REMOVE THE DROPDOWN & OVERLAY
	            this.toggle();
	        },

	        //function(el, options) are avaialble in toggle method
	        toggle: function() {
	            if(this.$element.data('dropdown') === 'show') {
	                this.hideMenu();
	            }
	            else {
	                this.showMenu();
	            }
	        },

	        showMenu: function() {
	            this.$element.data('dropdown', 'show');
	            this.$element.find('ul').show();

	            if(this.$overlay) {
	                this.$overlay.show();
	            }
	            else {
	                this.$overlay = $('<div style="position: fixed; top: 0px;left: 0px; right: 0px; bottom: 0px; z-index: 999;"></div>');
	                this.$element.append(this.$overlay);
	            }
	        },

	        hideMenu: function() {
	            this.$element.data('dropdown', 'hide');
	            this.$element.find('ul').hide();
	            this.$overlay.hide();
	        }
	    };

	    // A really lightweight plugin wrapper around the constructor,
	    // preventing against multiple instantiations
	    $.fn[menuButton] = function ( options ) {
	        return this.each(function () {

	            // TOGGLE BUTTON IF IT EXISTS
	            if ($.data(this, 'plugin_' + menuButton)) {
	                $.data(this, 'plugin_' + menuButton).toggle();
	            }
	            // OTHERWISE CREATE A NEW INSTANCE
	            else {
	                $.data(this, 'plugin_' + menuButton, new Plugin( this, options ));
	            }
	        });
	    };


	    //DELEGATE CLICK EVENT FOR DROPDOWN MENUS
	    $(document).on('click', '[data-buttons=dropdown]', function(e) {
	        var $dropdown = $(e.currentTarget);
	        $dropdown.menuButton();
	    });

	    //IGNORE CLICK EVENTS FROM DISPLAY BUTTON IN DROPDOWN
	    $(document).on('click', '[data-buttons=dropdown] > a', function(e) {
	        e.preventDefault();
	    });

	})( jQuery, window, document);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	$(document).ready(function(){

	    'use strict';

	    //CREATE PAGE METHODS
	    var page = {
	        init: function() {
	            this.disableDemoButtons();
	        },


	        disableDemoButtons: function() {
	            $('.showcase [href^=#]').on('click', function(e) {
	                e.preventDefault();
	            });
	        }
	    };

	    //INITIALIZE PAGE
	    page.init();
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	    'use strict';

	    /*globals Unicorn, Backbone, _, $, NProgress */


	    //APP CONTROLLER
	    Unicorn.Views.App = Backbone.View.extend({
	        el: 'body',
	        url: Unicorn.Options.serverUrl + '/download/' + Unicorn.Options.name + '?',
	        showcaseNames: [],
	        buildTypes: [],

	        events: {
	            'click .download': 'download',
	            'click .customize': 'customize'
	        },

	        initialize: function() {
	            this.listenTo(this.model, 'change:types', this.checkForSelectedTypes);
	            this.listenTo(this.model, 'sync', this.updateGlobalStyles);
	            this.listenTo(this.model, 'invalid', this.showError);
	            this.listenTo(this.model, 'options:update:started', this.optionsUpdateStarted);
	            this.render();
	        },

	        optionsUpdateStarted: function() {
	            //NOTE: We have to use global jquery to grab all .download classes on the page
	            $('.download').addClass('disabled');
	            $('.customize').addClass('disabled');

	            //Track GA Event
	            // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
	            var d = new Date();
	            var customizedAt = d.getMonth() + '-' + d.getDate() + '-' + d.getFullYear() + '__' + d.getHours() + ':' + d.getMinutes();
	            _gaq.push(['_trackEvent', 'Customize', 'Customized-Buttons-Options', 'Customized-At--' + customizedAt]);
	        },

	        render: function() {

	            //CREATE MENU BAR
	            this.menubar = new Unicorn.Views.Menu({
	                el: $('.menu-bar'),
	                model: this.model
	            });

	            //ACTIVATE SHOWCASE VIEWS
	            this.showcases = $('.showcase');
	            _.each(this.showcases, this.createShowCase, this);

	            //ADD SHOWCASE TYPES TO MODEL
	            this.model.set({
	                types: this.buildTypes,
	                allTypes: _.clone(this.buildTypes),
	                showcases: this.showcaseNames
	            });

	            //CREATE SIDE NAV
	            this.createNav();

	            return this;
	        },

	        createShowCase: function(showcase) {
	            //GET TYPE OF SHOWCASE
	            var type = $(showcase).data('type');
	            var name = $(showcase).data('name');

	            this.showcaseNames.push({
	                name: name,
	                type: type
	            });

	            //ADD BUILD TYPE MODULES TO ARRAY
	            if(type === 'build') {
	                this.buildTypes.push(name);
	            }

	            new Unicorn.Views.Showcase({
	                model: this.model,
	                el: showcase
	            });
	        },

	        createNav: function() {
	            new Unicorn.Views.Nav({
	                model: this.model,
	                el: $('.nav')
	            });
	        },

	        updateGlobalStyles: function() {
	            //UPDATE CSS WITH STYLES WITH CUSTOM BUTTON CSS FROM SERVER
	            var css = this.model.get('css');
	            var styleTag = $('#custom-styles');
	            styleTag.text(css);

	            //TRIGGER STYLES UPDATED EVENT
	            this.model.trigger('styles:updated');
	            NProgress.done();

	            //ENABLE BUTTONS ON CALLBACK
	            $('.download').removeClass('disabled');
	            $('.customize').removeClass('disabled');
	        },


	        build: function(e) {
	            e.preventDefault();
	            this.model.save();
	        },

	        customize: function(e) {
	            e.preventDefault();
	            var button = $(e.currentTarget);

	            if(!button.hasClass('disabled')) {
	                //CREATE CUSTOMIZE MODAL
	                var modal = new Unicorn.Views.Customizer({ model: this.model });

	                //APPEND THEN RENDER
	                this.$el.append(modal.el);
	                modal.trigger('dom');
	            }
	        },

	        checkForSelectedTypes: function(model, types) {

	            if(types.length > 0) {
	                //ENABLE DOWNLOAD IF MORE THAN 1 TYPE IS SELECTED
	                this.$('.download').removeClass('disabled');

	                //REMOVE BLANK STATE
	                this.$('.alert').remove();
	            }
	            else {
	                //DISABLE DOWNLOAD, NO TYPES SELECTED
	                this.$('.download').addClass('disabled');

	                //SHOW BLANKSTATE
	                this.showError('You need to select at least one button type.');
	            }
	        },

	        showError: function(message) {
	            var hero = $('.hero-call-to-action');

	            //REMOVE EXISTING ERROR MESSAGES
	            this.$('.alert').remove();

	            //ADD MESSAGE
	            hero.prepend('<div class="alert alert-error">' + message + '</div>');
	        },

	        download: function(e) {
	            e.preventDefault();
	            var types = this.model.get('types');
	            var button = $(e.currentTarget);

	            // ONLY DOWNLOAD IF THEY HAVE AT LEAST ONE ITEM SELECTED
	            if (types && types.length && !button.hasClass('disabled')) {

	                //CREATE A URL FROM MODEL VALUES
	                var payload = this.model.getPayload();
	                var url = this.url + payload;
	                var start = new Date().getTime();
	                window.open(url, 'Download');
	                var finished = new Date().getTime();
	                var timeItTook = finished - start;

	                //Track GA Event and append -<TIME IT TOOK>
	                // https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
	                // _trackEvent(category, action, opt_label, opt_value, opt_noninteraction)
	                _gaq.push(['_trackEvent', 'Downloads', 'Downloaded-Buttons-Zip', 'Download-Time', timeItTook, true]);

	            }
	        }
	    });


	})();





/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	    'use strict';

	    /*globals Unicorn, Backbone, _ */


	    Unicorn.Model = Backbone.Model.extend({

	        defaults:  {
	            name: 'buttons',
	            build_styleguide: false
	        },

	        initialize: function() {
	            this.url = this.get('serverUrl') + '/build/' + this.get('name');
	        },

	        getFormattedData: function() {
	            var raw = this.toJSON();

	            //CREATE FORMATTED DATA FOR VIEW TEMPLATES
	            return {
	                name: raw.name,
	                namespace: raw['btn-name'],
	                glow: raw['btn-glow-name'],
	                color: raw['btn-font-color'],
	                size: raw['btn-font-size'],
	                weight: raw['btn-font-weight'],
	                family: raw['btn-font-family'],
	                actions: raw['btn-actions']
	            };
	        },

	        build: function(form) {
	            var $form = $(form);
	            var $colorRows = $form.find('.color-row');

	            //Nice UX .. if user doesn't get the default leading dot '.' then
	            //we'll strip leading . when they enter (cause we're nice guys)
	            var namespace = form['btn-namespace'].value;
	            namespace = namespace.substr(0, 1) === '.' ? namespace.substr(1, (namespace.length-1)) : namespace;

	            //SET NEW BASE VALUES
	            var newValues = {
	                'btn-name': namespace,
	                'btn-namespace': '.' + namespace,//MUST START OUT CONSISTENT WITH CLASS USED IN INITIAL MARKUP!
	                'btn-font-size': form['btn-font-size'].value,
	                'btn-font-family': form['btn-font-family'].value.split(','),
	                'btn-actions': []
	            };

	            //NOW GET NEW BUTTON ACTION VALUES
	            _.each($colorRows, function(row) {
	                var $row = $(row);

	                newValues['btn-actions'].push({
	                    name: $row.find('.action-name').val(),
	                    color: $row.find('input[name="color"]').val(),
	                    background: $row.find('input[name="background"]').val()
	                });
	            });

	            //SAVE NEW VALUES
	            this.save(newValues, {wait: true});
	        },

	        getPayload: function() {
	            var payload =  _.pick(this.attributes, 'name', 'btn-name', 'btn-namespace', 'btn-glow-namespace', 'btn-glow-name', 'btn-font-color', 'btn-font-size', 'btn-font-weight', 'btn-font-family', 'btn-actions', 'types', 'build_styleguide');
	            return $.param(payload);
	        },

	        toJSON: function(method) {
	            var data = {};

	            if (method === 'update' || method === 'create') {
	                //ONLY GRAB THE ATTRIBUTES THE SERVER CAN HANDLE
	                data = _.pick(this.attributes, 'name', 'btn-name', 'btn-namespace',  'btn-glow-namespace', 'btn-glow-name', 'btn-font-color', 'btn-font-size', 'btn-font-weight', 'btn-font-family', 'btn-actions', 'build_styleguide');
	                data = _.clone(data);
	                data.types = this.get('allTypes');
	            }
	            else {
	                data = _.clone(this.attributes);
	            }

	            return data;
	        },

	        parse: function(response) {
	            var styles = {css: '', options: ''};
	            var module = this.get('name');

	            //TRIGGER ERROR EVENT AND PASS MESSAGE
	            if (response.error) {
	                var message = response.message || 'Server error.';
	                this.trigger('invalid', message);
	            }

	            // CHECK FOR PROPER RESPONSE THEN SET CSS
	            if (response && response[module]) {
	                styles.css = response[module];
	            }

	            return styles;
	        }
	    });

	})();


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	    'use strict';

	    /*globals Backbone, _, $ */


	    ////////////////////////////////////////////////
	    // BACKBONE CUSTOM SETTINGS ////////////////////
	    ////////////////////////////////////////////////

	    Backbone.emulateHTTP = true;

	    Backbone.sync = function(method, model, options) {
	        options = options || {};

	        var params = {
	            type: 'POST',
	            dataType: 'jsonp',
	            data: model.toJSON(method, model),
	            url: model.url,
	        };

	        var data = _.extend(params, options);

	        return $.ajax(data);
	    };



	    ////////////////////////////////////////////////
	    // APP NAMESPACE ///////////////////////////////
	    ////////////////////////////////////////////////
	    window.Unicorn = {
	        Models: {},
	        Views: {},
	        Options: {
	            serverUrl: 'http://options-compiler.herokuapp.com',
	            //serverUrl: 'http://localhost:5000',
	            name: 'buttons',
	            'btn-namespace': '.button',//MUST START OUT CONSISTENT WITH CLASS USED IN INITIAL MARKUP!
	            'btn-name': 'button',
	            'btn-glow-namespace': '.glow',
	            'btn-glow-name': 'glow',
	            'btn-font-color': '#666',
	            'btn-font-size': '14px',
	            'btn-font-weight': 300,
	            'btn-font-family': ['Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif'],
	            'btn-actions': [
	                {
	                    name: 'primary',
	                    background: '#00A1CB',
	                    color: '#FFFFFF'
	                },
	                {
	                    name: 'action',
	                    background: '#7db500',
	                    color: '#FFFFFF'
	                },
	                {
	                    name: 'highlight',
	                    background: '#F18D05',
	                    color: '#FFFFFF'
	                },
	                {
	                    name: 'caution',
	                    background: '#E54028',
	                    color: '#FFFFFF'
	                },
	                {
	                    name: 'royal',
	                    background: '#87318C',
	                    color: '#FFFFFF'
	                }
	            ]
	        }
	    };

	})();






/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	    'use strict';

	    /*globals Unicorn, Backbone, _, $ */

	    //APP CONTROLLER
	    Unicorn.Views.FormColorRow = Backbone.View.extend({
	        tagName: 'li',
	        className: 'color-row',
	        template: _.template($('#template-color-row').html()),

	        initialize: function(data) {
	            this.data = data;
	            this.render();

	            //REGISTER ELEMENTS
	            this.$button = this.$('.button');
	            this.$color = this.$('input[name=color]');
	            this.$namespace = this.$('.action-name');
	            this.$background = this.$('input[name=background]');

	            //LISTEN FOR CHANGES
	            this.$('input').change(_.bind(this.updateButtonPreview, this));
	        },

	        render: function() {
	            this.$el.html(this.template(this.data));

	            return this;
	        },

	        updateButtonPreview: function() {
	            var color = this.$color.val();
	            var background = this.$background.val();
	            var namespace = this.$namespace.val();

	            this.$button.css({
	                background: background,
	                color: color
	            }).text(namespace);
	        }
	    });
	})();



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	    'use strict';

	    /*globals Unicorn, Backbone, _, $, NProgress */


	    //APP CONTROLLER
	    Unicorn.Views.Customizer = Backbone.View.extend({
	        tagName: 'form',

	        template: _.template($('#template-customizer').html()),

	        events: {
	            'click .close': 'close'
	        },

	        initialize: function() {
	            this.on('dom', this.activateValidation, this);

	            this.render();
	        },

	        render: function() {
	            this.data = this.model.getFormattedData();

	            this.$el.append(this.template(this.data));
	            this.createButtonList();

	            this.selectedFontFamily();

	            return this;
	        },

	        selectedFontFamily: function() {
	            var currentFont = this.data.family[0];
	            var name;

	            switch(currentFont) {
	                case 'Helvetica Neue Light':    name = '#helvetica';   break;
	                case 'Cambria':                 name = '#times';       break;
	                case 'Constantia':              name = '#georgia';     break;
	                case 'Consolas':                name = '#monospace';   break;
	                case 'Brush Script MT':         name = '#script';      break;
	                default:  name = '#helvetica';
	            }

	            //SET SELECTED ATTRIBUTE ON DROPDOWN MENU
	            this.$(name).attr('selected', 'selected');
	        },

	        activateValidation: function() {
	            var self = this;

	            $.validator.addMethod('cssCharset', function (value, element) {
	                //Loose validation of alphas, digits, underscores, and hyphens
	                return this.optional(element) || /^[A-Za-z0-9\-\_]+$/.test(value);
	            }, 'Please only enter valid CSS characters.');

	            //DEFAULT RULES
	            var rules = {
	                'btn-namespace': {required: true, cssCharset: true},
	                'btn-font-size': {required: true},
	                'name': {required: true, cssCharset: true}
	            };

	            //DYNAMIC RULES (ALL ACTIONS)
	            _.each(this.data.actions, function(action) {
	                rules['action-' + action.name] = {
	                    cssCharset: true,
	                    required: true
	                };
	            });

	            this.$el.validate({
	                rules: rules,
	                submitHandler: function(form) {
	                    self.update(form);
	                }
	            });

	            this.updateColorPickers();
	        },

	        createButtonList: function() {
	            var buttonList = this.$('.button-actions');
	            var namespace = this.model.get('btn-name');

	            _.each(this.data.actions, function(action) {
	                action.namespace = namespace;

	                var button = new Unicorn.Views.FormColorRow(action);
	                buttonList.append(button.el);
	            }, this);
	        },

	        updateColorPickers: function() {
	            this.$('input[type="color"]').spectrum({
	                preferredFormat: 'hex',
	                showInput: true,
	                clickoutFiresChange: true
	            });
	        },

	        update: function(form) {
	            this.model.trigger('options:update:started');

	            //START PROGRESS INDICATOR
	            NProgress.start();
	            this.close();

	            this.model.build(form);
	        },

	        close: function() {
	            var self = this;
	            this.$el.addClass('animated bounceOutUp').fadeOut(function(){
	                self.remove();
	            });
	        }
	    });
	})();



/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	    'use strict';

	    /*globals Unicorn, Backbone */

	    Unicorn.Views.Nav = Backbone.View.extend({
	        events: {
	            'click .mobile-menu': 'toggleMobileMenu',
	            'click ul li a': 'scrollToLink',
	            'click h1 a': 'scrollToLink'
	        },

	        initialize: function() {
	            //GET UPDATED ATTRIBUTES
	            this.showcases = this.model.get('showcases');

	            //REGISTER ELEMENTS
	            this.listContainer = this.$('ul');

	            this.render();
	        },

	        render: function() {


	            //CREATE LIST TOGGLE BUTTONS
	            this.createToggleButtons();

	            return this;
	        },

	        createToggleButtons: function() {
	            for (var i = 0, l = this.showcases.length; i < l; i++) {
	                this.createButton(this.showcases[i]);
	            }
	        },

	        scrollToLink: function(e)  {
	            e.preventDefault();

	            //REMOVE MOBILE CLASS
	            this.listContainer.toggleClass('nav-show');

	            //CREATE VARS
	            var currentButton = $(e.currentTarget);
	            var buttonId = currentButton.attr('href');
	            var offset = (buttonId === '#home') ? 0 : 60;


	            //ANIMATE SCROLL EFFECT
	            $('html, body').animate({
	                scrollTop: $(buttonId).offset().top - offset
	            }, 'slow');
	        },

	        createButton: function(data) {

	            //CREATE A TOGGLE BUTTON
	            var toggleButton = new Unicorn.Views.ToggleButton({
	                model: this.model,
	                name: data.name,
	                type: data.type
	            });

	            this.listContainer.append(toggleButton.el);
	        },

	        toggleMobileMenu: function() {
	            this.listContainer.toggleClass('nav-show');
	        }
	    });
	})();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	    'use strict';

	    /*globals Unicorn, Backbone, $ */

	    //MENU BAR
	    Unicorn.Views.Menu = Backbone.View.extend({

	        initialize: function() {
	            //REGISTER ELEMENTS
	            this.listenTo(this.model, 'change', this.updateComplete);
	            this.render();
	        },

	        render: function() {
	            return this;
	        },

	        updateComplete: function() {
	            var data = this.model.toJSON();
	        }
	    });
	})();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	    'use strict';

	    /*globals Unicorn, Backbone, prettyPrint, _ */

	    //CODE EXAMPLE VIEW
	    Unicorn.Views.Showcase = Backbone.View.extend({
	        template: _.template($('#template-code').html()),

	        initialize: function() {
	            this.name = this.$el.data('name');
	            this.type = this.$el.data('type');

	            //REGISTER ELEMENTS
	            this.$examples = this.$('.showcase-examples');
	            this.$code = this.$('code');

	            //LISTEN FOR CHANGES ON THE MODEL THEN RE-RENDER
	            this.listenTo(this.model, 'change:btn-namespace', this.updateNamespace, this);
	            this.listenTo(this.model, 'change:btn-actions', this.updateActionName, this);

	            //UPDATE VISIBILITY ON TYPE EVENT IF THIS IS A BUILD ELEMENT
	            if(this.type === 'build') {
	                this.listenTo(this.model, 'change:types', this.updateVisibility, this);
	            }

	            //RENDER
	            this.render();
	        },

	        render: function() {
	            this.updateCodePreview();

	            return this;
	        },

	        updateNamespace: function() {
	            //GET PREVIOUS and NEW NAMESPACES
	            var prevNamespace = this.model.previous('btn-name');

	            // CHECK FOR A PREVIOUS VALUE
	            if (prevNamespace) {

	                //GET NEW NAMESPACE
	                var newNamespace = this.model.get('btn-name');
	                var classname = '.' + prevNamespace;

	                //NOW UPDATE CLASS NAMES
	                this.updateClassName(classname, prevNamespace, newNamespace);
	            }
	        },

	        updateActionName: function() {
	            //GET PREVIOUS and NEW NAMESPACES
	            var previousActions = this.model.previous('btn-actions');
	            var newActions = this.model.get('btn-actions');
	            var namespace = this.model.get('btn-name');

	            //MAKE SURE THERE WERE PREVIOUS VALUES AND THEY'RE NOT THE SAME
	            if(previousActions && previousActions !== newActions) {

	                //PLUCK ARRAY OF PREVIOUS NAMES
	                var previousNames = _.pluck(previousActions, 'name');

	                //PLUCK ARRAY OF NEW NAMES
	                var newNames = _.pluck(newActions, 'name');

	                //ZIP THEM TOGETHER => [['primary', 'newprimary'], ['action', 'newaction'], ...]
	                var pairs = _.zip(previousNames, newNames);

	                _.each(pairs, function(pair){
	                    //DON'T REPLACE IF IDENTICAL
	                    if(pair[0] !== pair[1]) {

	                        //CREATE A CONTAINER FOR CLASS NAMES
	                        var classname = [];
	                        var types = ['-', '-flat-', '-3d-', '-border-'];

	                        //ADD CLASS NAMES TO LIST
	                        _.each(types, function(type) {
	                            classname.push('.' + namespace + type + pair[0]);
	                        });

	                        //FLATTEN THIS BIZNATCH
	                        classname = classname.join(',');

	                        //UPDATE CLASSNAMES
	                        this.updateClassName(classname, pair[0], pair[1]);
	                    }
	                }, this);
	            }
	        },

	        updateClassName: function(classname, prevNamespace, newNamespace) {
	            var buttonsAndDropdowns = classname + ', [class^=' + prevNamespace + '-dropdown]';
	            var elements = this.$examples.find(buttonsAndDropdowns);

	            //CRETE A REGEX TO LOOK FOR PREVIOUS NAMESPACE
	            var findPattern = new RegExp(prevNamespace, 'g');

	            //LOOP THROUGH AND REPLACE CLASS NAMES ON ALL ELEMENTS
	            _.each(elements, function(element) {

	                //REGISTER ELEMENT
	                var $element = $(element);

	                //FIND CURRENT CLASS NAMES
	                var classNames = $element.attr('class');

	                //CREATE A STRING OF UPDATED CLASS NAMES
	                var newClassNames = classNames.replace(findPattern, newNamespace);

	                //NOW SET THE NEW CLASS NAMES ON ELEMENT
	                $element.attr('class', newClassNames);
	            }, this);

	            //NOW UPDATE CODE PREVIEW
	            this.updateCodePreview();
	        },

	        updateCodePreview: function() {
	            var encodedHTML = this._encodeHTML(this.$examples.html());

	            this.$code.html(this.template({code: encodedHTML}));

	            prettyPrint();
	        },

	        updateVisibility: function() {
	            var types = this.model.get('types');
	            var isVisible = _.contains(types, this.name);

	            if(isVisible) {
	                this.updateNamespace();
	                this.updateActionName();

	                this.$el.fadeIn();
	            }
	            else {
	                this.$el.fadeOut();
	            }
	        },

	        _encodeHTML: function(str) {
	            return String(str).replace(/<br>/g, '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	        }
	    });
	})();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function(){
	    'use strict';

	    /*globals Unicorn, Backbone, _ */

	    //CODE EXAMPLE VIEW
	    Unicorn.Views.ToggleButton = Backbone.View.extend({
	        template: _.template($('#template-toggle').html()),
	        tagName: 'li',
	        included: true,

	        events: {
	            'click .nav-toggle-button': 'updateTypes',
	            'touchstart .nav-toggle-button': 'updateTypes' //iPad
	        },

	        initialize: function(options) {
	            this.name = options.name;
	            this.type = options.type;

	            this.render();
	        },

	        render: function() {
	            var status = this.included ? 'Included' : 'Removed';

	            //RENDER TEMPLATE
	            this.$el.html(this.template({
	                status: status,
	                included: this.included,
	                name: this.name,
	                type: this.type
	            }));

	            return this;
	        },

	        updateTypes: function(e) {
	            e.preventDefault();
	            var included = $(e.currentTarget).data('included');

	            //TOGGLE VALUE
	            this.included = !included;

	            //UPDATE MODEL
	            this.updateModel();

	            this.render();
	        },

	        updateModel: function() {
	            //CLONE TYPES SO YOU'RE NOT EDITING PROPERTIES DIRECTLY
	            var types = _.clone(this.model.get('types'));

	            // ADD TYPE THEN REMOVE DUPLICATES
	            if(this.included === true) {
	                types.push(this.name);
	                types = _.uniq(types);
	            }
	            // REMOVE TYPE FROM ARRAY
	            else {
	                types = _.without(types, this.name);
	            }

	            //SET MODEL WITH NEW ARRAY
	            this.model.set({types: types});
	        }
	    });
	})();

/***/ }
/******/ ])