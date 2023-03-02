const cTable = require('console.table');
const mysql = require('mysql2');

async function viewDepartments(){
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT * FROM department`)
    db.end();
    console.log();
    console.table(rows);
}

async function viewRoles(){
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT role.id, role.title, department.name AS department, role.salary
                              FROM role
                              LEFT JOIN department ON role.department_id = department.id`) 
    db.end();
    console.log();
    console.table(rows);
}

async function viewEmployees(){
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
              FROM role
              LEFT JOIN department ON role.department_id = department.id
              RIGHT JOIN employee ON role.id = employee.role_id
              LEFT JOIN employee m ON m.id = employee.manager_id`)
    db.end();
    console.log();
    console.table(rows);
}

module.exports = {  
    viewDepartments, 
    viewRoles, 
    viewEmployees
};