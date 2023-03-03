const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'dannymanaglia', 
    database: 'employees_db'
});

module.exports = db;
