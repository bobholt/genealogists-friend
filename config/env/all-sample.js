'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

// Environment configuration for all environments
module.exports = {
  app: {
    title: 'Genealogist\'s Friend',
    description: 'An application for serious genealogists to manage sources and assertions'
  },
  port: process.env.PORT || 3000,
  sessionSecret: 'MySuperSecret',
  root: rootPath,
  assets: {
    lib: {
      css: [
        'public/bower_components/bootstrap/dist/css/bootstrap.css',
        'public/bower_components/bootstrap/dist/css/bootstrap-theme.css'
      ],
      js: [
        'public/bower_components/jquery/dist/jquery.js',
        'public/bower_components/bootstrap/dist/js/bootstrap.js'
      ]
    },
    css: [
      'public/modules/**/*.css'
    ],
    js: [
      // 'public/config.js',
      // 'public/application.js',
      'public/modules/*/*.js',
      'public/modules/*/*[!tests]*/*.js'
    ],
    // tests: [
    // ]
  }
};
