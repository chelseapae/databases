var models = require('../models');
// var requestHandler = require('./index').requestHandler;

module.exports = {
  // a function which handles a get request for all messages
  get: function (req, res) {
      models.messages.getAll((err, results) => {
        if (err) {
          res.statusCode = 500;
          console.log(err);
          res.send(err)
        } else {
          res.statusCode = 200;
          res.send(results)
        }
      })
  },
  // a function which handles posting a message to the database
  post: function (req, res) {
    models.messages.create(req.body, (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.statusCode = 201;
        res.send(results);
      }
    })
  }
};