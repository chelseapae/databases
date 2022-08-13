var models = require('../models');

module.exports = {
  // a function which handles a get request for all messages
  get: function (req, res) {
    models.messages.getAll()
    .then((results) => {
      console.log('CHELSEASTYLE', results)
      res.send(results);
    })
  },

  // a function which handles posting a message to the database
  post: function (req, res) {
    models.messages.create(req.body)
    .then((results) => {
      res.send(results);
  })
}
};