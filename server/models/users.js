var db = require('../db');

module.exports = {
  // produce a list of all users
  getAll: function (callback) {
    db.connection.query(
      'SELECT * FROM users',
      function(err, results) {
        if (err) {
          callback(err)
        } else {
          console.log(results);
          callback(null, results)
        }
      }
    );
  },

  // add a user to the db
  create: function (username, callback) {
    console.log('&&&&&&USERNAME', username)
    db.connection.query(
      `INSERT INTO users (username) VALUES ('${username}')`,
      (err, results) => {
        if (err) {
          callback(err)
        } else {
          callback(null, results)
        }
      }
    )
  }
};
