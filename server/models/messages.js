var db = require('../db');
var messages = require('../controllers/messages');

module.exports = {
  // a function which produces all the messages
  getAll: function (callback) {

    db.connection.query(
      'SELECT * FROM messages',
      function(err, results) {
        if (err) {
          callback(err)
        } else {
          callback(null, results)
        }
      }
    );
  },

  // a function which can be used to insert a message into the database
  create: function (messageBody, callback) {

    db.connection.query(
      'INSERT INTO messages (text, user_id, room_name) VALUES (?, (SELECT id FROM users WHERE (username = ?) limit 1), ?)', [messageBody.message, messageBody.username, messageBody.roomname],
      function(err, results) {
        if (err) {
          callback(err)
        } else {
          callback(null, results)
        }
      }
    );
  }
};

//      `INSERT INTO messages (text, user_id, room_name) VALUES ('${messageBody.message}', (SELECT id FROM users WHERE (username = '${messageBody.username}') limit 1), '${messageBody.roomname}')`,