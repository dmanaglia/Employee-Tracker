const cTable = require('console.table');
const mysql = require('mysql2');

function viewDepartments(){
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    return db.promise().query(`SELECT * FROM department`)
    .then(([rows,fields]) => {
        console.table(rows);
    })
    .then( () => {
        db.end();
    });
}

function viewRoles(){
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    return db.promise().query(`SELECT role.id, role.title, department.name AS department, role.salary
                               FROM role
                               JOIN department ON role.department_id = department.id`) 
    .then(([rows,fields]) => {
        console.table(rows);
    })
    .then( () => {
        db.end();
    });
}

function viewEmployees(){
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    return db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
              FROM role
              JOIN department ON role.department_id = department.id
              JOIN employee ON role.id = employee.role_id
              LEFT JOIN employee m ON m.id = employee.manager_id`)
    .then(([rows,fields]) => {
        console.table(rows);
    })
    .then( () => {
        db.end();
    });
}

module.exports = {viewDepartments, viewRoles, viewEmployees}