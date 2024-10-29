import mysql from 'promise-mysql';
import config from '../config';

const connection = mysql.createPool({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
  connectionLimit: 10,
});

const getConnection = () => {
  return connection;
};

module.exports = {
  getConnection,
};
