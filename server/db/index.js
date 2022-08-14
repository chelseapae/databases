var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '', { host: 'localhost', dialect: 'mysql'});

var Users = db.define('Users', {
  username: Sequelize.STRING
},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false
}
);

var Messages = db.define('Messages', {
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
  // UserId: Sequelize.INTEGER,
},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false
}
);

Users.hasMany(Messages);
Messages.belongsTo(Users);
//, {foreignKey: 'user_id'}

Users.sync()
Messages.sync()

// module.exports = { Users, Messages }
exports.Users = Users;
exports.Messages = Messages;
