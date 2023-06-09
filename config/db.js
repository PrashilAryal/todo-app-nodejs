const { Pool } = require("pg");
const { database } = require("pg/lib/defaults");

const getConnection = () => {
  const conn = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });
  return conn;
};

module.exports = getConnection;
