import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'xxx',
  database: 'xxx',
  password: 'xxx'
});

export default connection;
