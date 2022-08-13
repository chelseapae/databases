
var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '', { host: 'localhost', dialect: 'mysql'});

var Users = db.define('users', {
  username: Sequelize.STRING
},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false
}
);

var Messages = db.define('messages', {
  text: Sequelize.STRING,
  user_id: Sequelize.INTEGER,
  roomname: Sequelize.STRING,
},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false
}
);

Users.hasMany(Messages, {foreignKey: 'userId'});

module.exports = { Users, Messages }
