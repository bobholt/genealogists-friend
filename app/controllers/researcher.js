'use strict';

var page = 'researcher';

module.exports = {
  renderPage: function(req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      res.render(page, {
        helpers: {
          activeClass: function(section) {
            console.log(section);
            if (req.url.indexOf(section) !== -1) {
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
