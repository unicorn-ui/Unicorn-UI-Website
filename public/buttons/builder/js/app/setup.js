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
          background: '#1B9AF7',
          color: '#FFFFFF'
        },
        {
          name: 'action',
          background: '#A5DE37',
          color: '#FFFFFF'
        },
        {
          name: 'highlight',
          background: '#FEAE1B',
          color: '#FFFFFF'
        },
        {
          name: 'caution',
          background: '#FF4351',
          color: '#FFFFFF'
        },
        {
          name: 'plain',
          background: '#FFFFFF',
          color: '#1B9AF7'
        },
        {
          name: 'inverse',
          background: '#222',
          color: '#EEE'
        },
        {
          name: 'royal',
          background: '#7B72E9',
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
      'btn-font-size': '16px',
      'btn-font-weight': '300',
      'btn-font-family': ['Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif']
    }
  };

})();


