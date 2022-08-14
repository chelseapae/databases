/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'chat',
    port: '3306'
  });

  beforeAll((done) => {
    dbConnection.connect();
    const tablename = 'Messages';
    dbConnection.query(`truncate ${tablename};`, done);
    dbConnection.query('DELETE from Users WHERE id > 2', done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  const username = 'Valjean';
  const message = 'In mercy\'s name, three days is all I need.';
  const messageTwo = 'Chelsea and Cameron @ RPP2205';
  const roomname = 'Hello';


  // FIRST TEST //

  it('Should insert a posted messages to the DB', (done) => {

    axios.post(`${API_URL}/Users`, { username })
      .then(() => {
        return axios.post(`${API_URL}/Messages`, { username, message, roomname })
      })
      .then(() => {
        const queryString = 'SELECT * FROM Messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            throw err;
          }
          expect(results.length).toEqual(1);
          expect(results[0].text).toEqual(message);
          done();
        })
      })
      .catch((err) => {
        throw err;
      });
  });

  // SECOND TEST //

  it.only('Should output all messages from the DB', (done) => {

    const queryString = 'INSERT INTO Messages (text, roomname) VALUES (?, ?);';
    const queryArgs = [message, roomname];
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          expect(messageLog[0].text).toEqual(message);
          expect(messageLog[0].roomname).toEqual(roomname);
          done();
        })
        .catch((err) => {
          throw err;
        });
      });
  });

  // THIRD TEST - ADDITIONAL MESSAGE //

  it('Should insert 2 posted messages to the DB properly', (done) => {

    const queryString = 'SELECT * FROM Messages;';
    const queryArgs = [];

    dbConnection.query(queryString, queryArgs, (err, results) => {
      if (err) {
        throw err;
      }
      console.log('RESULTS12341234', results);
      expect(results.length).toEqual(2);
      expect(results[0].text).toEqual(message);
      expect(results[1].text).toEqual(message);
      done();
    })
  });


  // FOURTH TEST - USERS //

  it('Should output all users from the DB', (done) => {

    const queryString = 'SELECT username FROM Users;';
    const queryArgs = [];
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      axios.get(`${API_URL}/Users`)
        .then((response) => {
          const userLog = response.data;
          expect(userLog[0].username).toEqual(username);
          done();
        })
        .catch((err) => {
          throw err;
        })
    })
  });

});
