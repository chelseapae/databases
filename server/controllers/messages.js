/* eslint-disable */
var models = require('../models');
var requestHandler = require('./index').requestHandler;

module.exports = {
  // a function which handles a get request for all messages
  get: function (req, res) {
    return requestHandler(req, res);
  },
  // a function which handles posting a message to the database
  post: function (req, res) {
    return requestHandler(req, res);
  }
};
