const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'world',
    password: 'Hecs@2023!'
});

module.exports = pool.promise();

