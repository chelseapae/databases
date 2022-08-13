var Messages = require('../ormDB.js').Messages;
var Users = require('../ormDB.js').Users;
var sequelize = require('sequelize');

module.exports = {
  // a function which produces all the messages
  getAll: () => (

    Users.sync()
    .then(() => {
      Messages.findAll({ include: Users })
      .then((result) => {
        console.log('RESSSSSSS', result)
        return result;
      })
    })
  ),

  // a function which can be used to insert a message into the database
  create: (messageBody) => (
    Messages.sync()
    .then(() => {
      return Messages.create({text: messageBody.message, username: messageBody.username, roomname: messageBody.roomname});
    })
    .catch((err) => {
      console.error(err);
    })
  )

};

//      `INSERT INTO messages (text, user_id, roomname) VALUES ('${messageBody.message}', (SELECT id FROM users WHERE (username = '${messageBody.username}') limit 1), '${messageBody.roomname}')`,