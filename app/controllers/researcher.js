'use strict';

var page = 'researcher';

module.exports = {
  renderPage: function(req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      res.render(page, {
        user: req.user ? req.user.toJSON() : null
      });
    }
  }
}
