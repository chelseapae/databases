var Messages = require('../db/index.js').Messages;
var Users = require('../db/index.js').Users;
var bluebird = require('bluebird');

module.exports = {
  // a function which handles a get request for all messages
  get: function (req, res) {
    Messages.findAll({ include: [Users] })
      .then((results) => {
        res.send(results)
      })
      .catch((err) => {
        console.log('Messages Get Error', err)
      });
  },

  // a function which handles posting a message to the database
  post: function (req, res) {
    Users.findOrCreate( {where: {username: req.body.username}} )
      .then((results) => {
        var params = {
          text: req.body.message,
          userid: results.id,
          roomname: req.body.roomname
        }
        Messages.create(params)
          .then((results) => {
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log('MESaPostInside', err);
          })
      })
      .catch((err) => {
        console.log('MESaPostOutside', err);
      })

  //   models.messages.create(req.body)
  //   .then((results) => {
  //     res.send(results);
  // })
}
};