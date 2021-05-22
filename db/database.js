const mysql = require('mysql2')
const promisemysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password',
    database: 'employees',
  });

  connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected to database.")
  });

  module.exports = connection;