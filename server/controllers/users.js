var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.users.getAll((err, results) => {
      if (err) {
        res.statusCode = 500;
        console.log(err);
        res.send(err)
      } else {
        res.statusCode = 200;
        res.send(JSON.stringify(results))
      }
    })
  },
  post: function (req, res) {
    models.users.create(req.body.username, (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.statusCode = 201;
        console.log('RESULTS****', results)
        res.send(results);
      }
    })
  }
};
