/* eslint-disable */

exports.messages = require('./messages.js');
exports.users = require('./users.js');
exports.connection = require('../db/index.js');


// var messages = [{username: 'userTest', text: 'this is the test', roomname: 'room1'}];

var requestHandler = function(request, response) {

  console.log('**************', request, response);

  var statusCode;
  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept, authorization',
    'access-control-max-age': 10
  };

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  if (request.method === 'OPTIONS') {
    response.writeHead(statusCode, headers);
    response.end('OK');

  } else if (request.url !== '/classes/messages') {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('Server not found');

  } else if (request.method === 'GET') {

    statusCode = 200;
    connection.execute(
      'SELECT * FROM `messages`',
      function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(results));
      }
    );

  } else if (request.method === 'POST') {

    statusCode = 201;
    response.writeHead(statusCode, headers);

    let body = '';
    request.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });

    request.on('end', () => {
      body = JSON.parse(body);
      messages.push(body);
      response.end();
    });
  }
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
};

exports.requestHandler = requestHandler;