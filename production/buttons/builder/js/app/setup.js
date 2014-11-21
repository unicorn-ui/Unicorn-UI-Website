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
      name: 'buttons',
      build_styleguide: false,
      serverUrl: 'http://localhost:5000',
//            serverUrl: 'http://options-compiler.herokuapp.com',
      'btn-namespace': 'button',//MUST INITIALLY START AS 'button'!
      'btn-colors': [
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
          name: 'silly',
          background: '#87318C',
          color: '#FFFFFF'
        }
      ],
      'btn-shapes': [
        {
          name: 'square',
          radius: '0'
        },
        {
          name: 'box',
          radius: '10px'
        },
        {
          name: 'rounded',
          radius: '4px'
        },
        {
          name: 'pill',
          radius: '200px'
        },
        {
          name: 'circle',
          radius: '100%'
        },
      ],
      'btn-sizes': [
        {
          name: 'giant',
          multiplier: '1.75'
        },
        {
          name: 'jumbo',
          multiplier: '1.5'
        },
        {
          name: 'large',
          multiplier: '1.25'
        },
        {
          name: 'normal',
          multiplier: '1'
        },
        {
          name: 'small',
          multiplier: '.75'
        },
        {
          name: 'tiny',
          multiplier: '.6'
        }
      ],
      'types': ['shapes', 'sizes', 'border', 'borderless', 'raised', '3d', 'glow', 'dropdown', 'groups', 'wrapper'],
      'btn-height': '40px',
      'btn-bgcolor': '#EEE',
      'btn-font-color': '#666',
      'btn-font-size': '14px',
      'btn-font-weight': '300',
      'btn-font-family': ['Arial', 'sans-serif']
    }
  };

})();


