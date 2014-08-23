'use strict';

var page = 'profile';

module.exports = {
  renderPage: function(req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
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
  }
}
