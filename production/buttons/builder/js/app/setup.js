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
        serverUrl: 'http://localhost:5000',
//            serverUrl: 'http://options-compiler.herokuapp.com',
          
        'btn-namespace': '.robs-buttons',
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
            name: 'pill',
            radius: '200px'
          },
          {
            name: 'rounded',
            radius: '3px'
          }
        ],
        'btn-sizes': [
          {
            name: 'giant',
            multiplier: '2'
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
            multiplier: '.5'
          }
        ],
        'types': ['border', 'shapes'],
        'btn-height': '40px',
        'btn-bgcolor': '#EEE',
        'btn-font-color': '#666',
        'btn-font-size': '14px',
        'btn-font-weight': '300',
        'btn-font-family': ['Arial', 'sans-serif']           
        
          
//            name: 'buttons',
//            'btn-namespace': '.button',//MUST START OUT CONSISTENT WITH CLASS USED IN INITIAL MARKUP!
//            'btn-name': 'button',
//            'btn-glow-namespace': '.glow',
//            'btn-glow-name': 'glow',
//            'btn-font-color': '#666',
//            'btn-font-size': '14px',
//            'btn-font-weight': 300,
//            'btn-font-family': ['Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'Lucida Grande', 'sans-serif'],
//            'btn-actions': [
//                {
//                    name: 'primary',
//                    background: '#00A1CB',
//                    color: '#FFFFFF'
//                },
//                {
//                    name: 'action',
//                    background: '#7db500',
//                    color: '#FFFFFF'
//                },
//                {
//                    name: 'highlight',
//                    background: '#F18D05',
//                    color: '#FFFFFF'
//                },
//                {
//                    name: 'caution',
//                    background: '#E54028',
//                    color: '#FFFFFF'
//                },
//                {
//                    name: 'royal',
//                    background: '#87318C',
//                    color: '#FFFFFF'
//                }
//            ]
    }
  };

})();



/**
* Buttons Module
*/

/*
var ButtonsModule = ButtonsModule || {};

ButtonsModule.buttonDefaultOptions = {
  'btn-namespace': '.robs-buttons',
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
      name: 'pill',
      radius: '200px'
    },
    {
      name: 'rounded',
      radius: '3px'
    }
  ],
  'btn-sizes': [
    {
      name: 'giant',
      multiplier: '2'
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
      multiplier: '.5'
    }
  ],
  'types': ['border', 'shapes'],
  'btn-height': '40px',
  'btn-bgcolor': '#EEE',
  'btn-font-color': '#666',
  'btn-font-size': '14px',
  'btn-font-weight': '300',
  'btn-font-family': ['Arial', 'sans-serif']
};

*/

//ButtonsModule.Model = JsonpModel.extend({
//  module: 'buttons',
//  defaults: ButtonsModule.buttonDefaultOptions,
//  url: function() {
//    // return 'http://options-compiler.herokuapp.com/build/buttons';
//    return 'http://localhost:5000/build/'+this.module;
//  }
//});

