const pool = require('./db');
module.exports = {
  async read(hash) {
    try {
      const conn = await pool.getConnection();
      const queryString = 'SELECT hash,url FROM URLS WHERE hash = ?';
      const rows = await conn.query(queryString, [hash]);
      conn.end();
      if (rows.length == 1) {
        return rows[0];
      }
      return false;
    } catch (err) {
      throw err;
    }
  },
  async list() {
    try {
      const conn = await pool.getConnection();
      const queryString = 'SELECT url,hash FROM URLS';
      const rows = await conn.query(queryString);
      conn.end();
      return rows;
    } catch (err) {
      throw err;
    }
  },
  async add({ url, hash }) {
    try {
      const conn = await pool.getConnection();
      const queryString = 'INSERT INTO URLS (url, hash) VALUES (?,?);';
      const urls = await conn.query(queryString, [url, hash]);
      conn.end();
      return urls;
    } catch (err) {
      throw err;
    }
  },
};
