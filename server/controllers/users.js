var models = require('../models');

module.exports = {
  get: function (req, res) {
    res.send(models.users.getAll());
  },
  post: function (req, res) {
    res.send(models.users.create(req.body.username));
  }
};
