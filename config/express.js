'use strict';

// Dependencies
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compress = require('compression');
var config = require('./config');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var express = require('express');
var flash = require('connect-flash');
var helmet = require('helmet');
var morgan = require('morgan');
var passport = require('passport');
var path = require('path');
var session = require('express-session');
var utilities = require('./utilities');
var _ = require('lodash');

module.exports = function() {

  // Initialize express app
  var app = express();

  // Initialize schemas
  utilities.getGlobbedFiles('./app/schemas/**/*.js').forEach(function(modelPath) {
    require(path.resolve(modelPath));
  });

  // Setting application local variables
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  app.locals.jsFiles = utilities.getJavaScriptAssets();
  app.locals.cssFiles = utilities.getCSSAssets();

  // Passing the request url to environment locals
  app.use(function(req, res, next) {
    res.locals.url = req.protocol + ':// ' + req.headers.host + req.url;
    next();
  });

  // Should be placed before express.static
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Showing stack errors
  app.set('showStackError', true);

  // Set lodash as the template engine
  app.engine( '.hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'app/views/layouts',
    partialsDir: 'app/views/partials'
  }) );

  // Set views path and view engine
  app.set( 'view engine', '.hbs' );
  app.set( 'views', config.root + '/app/views' );

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {

    // Enable logger (morgan)
    app.use(morgan('dev'));

    // Disable views cache
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  //  request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Enable jsonp
  app.enable('jsonp callback');

  // CookieParser should be above session
  app.use(cookieParser());

  // Session Storage
  var sess = {
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret,
    cookie: {}
  }
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  app.use(session(sess));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages
  app.use(flash());

  // Use helmet to secure Express headers
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.disable('x-powered-by');

  // Setting the app router and static folder
  app.use(express.static(path.resolve('./public')));

  // Load App Routes
  utilities.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
    require(path.resolve(routePath))(app);
  });

  // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
  app.use(function(err, req, res, next) {
    // If the error object doesn't exists
    if (!err) return next();

    // Log it
    console.error(err.stack);

    // Error page
    res.status(500).render('500', {
      error: err.stack
    });
  });

  // Assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not Found'
    });
  });

  return app;

};
