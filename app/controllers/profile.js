'use strict';

var page = 'profile';

module.exports = {
  renderPage: function(req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      console.log(req.user.toJSON());
      res.render(page, {
        helpers: {
          activeClass: function(section) {
            if (section === 'profile') {
              return 'active';
            } else {
              return '';
            }
          }
        },
        user: req.user ? req.user.toJSON() : null
      });
    }
  },
  updateProfile: function(req, res) {
    // For security measures we remove the roles from the req.body object
    delete req.body.roles;

    // Init Variables
    var user = req.user;

    req.body.familyNameFirst = req.body.familyNameFirst === "true";

    req.body.displayName = req.body.familyNameFirst ? req.body.familyName + ' ' + req.body.givenName : req.body.givenName + ' ' + req.body.familyName;

    user.set(req.body);

    // Add missing user fields
    // Then save the user
    user.save().then(function() {
      var userJSON = user.toJSON();

      // Remove sensitive data before login
      delete userJSON.password;

      req.login(userJSON, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.redirect('/profile');
        }
      });
    }).catch(function(err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
}
