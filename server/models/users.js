var User = require('../ormDB.js').Users;

module.exports = {
  // produce a list of all users
  getAll: () => (
    User.sync()
    .then(() => {
      return User.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
    })
    .catch((err) => {
      console.error(err);
    })
  ),

  // add a user to the db
  create: (name) => (
    User.sync()
    .then(() => {
      return User.create({username: name})
    })
    .catch((err) => {
      console.error(err);
    })
  )

};
