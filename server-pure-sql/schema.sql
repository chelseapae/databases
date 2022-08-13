DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `username` TEXT
);

CREATE TABLE messages (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `text` TEXT,
  `user_id` INTEGER,
  `roomname` TEXT,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
