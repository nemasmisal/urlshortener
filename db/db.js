const mariadb = require('mariadb');
const config = require('../utils/config');
const pool = mariadb.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPass,
  database: config.dbName
});

module.exports = {
  getConnection() {
    return new Promise(function (res, rej) {
      pool.getConnection()
        .then(function (conn) {
          res(conn);
        })
        .catch(function (error) {
          rej(error);
        });
    });
  }
};