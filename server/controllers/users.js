var Messages = require('../db/index.js').Messages;
var Users = require('../db/index.js').Users;
var bluebird = require('bluebird');

module.exports = {
  get: function (req, res) {
    Users.findAll()
      .then((results) => {
        res.send(results)
      })
      .catch((err) => {
        console.log('usersget', err);
      })
  },
  post: function (req, res) {
    // console.log('REQ123123', req.body.username)
    // console.log('CREATECREAT', Users.create)
    // console.log('COMPLETE', complete)
    Users.create( {username: req.body.username})
      .then((results) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('usersPost', err);
        res.sendStatus(500);
      })
  }
};
