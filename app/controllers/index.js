'use strict';

var page = 'index';

module.exports = {
  renderPage: function(req, res) {
    res.render(page, {
      user: req.user ? req.user.toJSON() : null
    });
  }
}
