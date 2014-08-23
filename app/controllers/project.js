'use strict';

var page = 'projects';

module.exports = {
  renderPage: function(req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      res.render(page, {
        helpers: {
          activeClass: function(section) {
            if (section === 'projects') {
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
