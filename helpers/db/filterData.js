const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {getManagerList, getEmployeeId, getDepartmentList, getDepartmentId, getRoleIdsByDepartment} = require('./myData')

async function viewEmployeeByManager(){
    let managerList = await getManagerList();
    let answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'manager_name',
            message: `Which manager's employees would you like to view?`,
            choices: managerList
        }
    ])
    let manager_id = await getEmployeeId(answer.manager_name);
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary
            FROM role
            JOIN department ON role.department_id = department.id
            JOIN employee ON role.id = employee.role_id
            LEFT JOIN employee m ON m.id = employee.manager_id
            WHERE employee.manager_id = ${manager_id}`)
    db.end();
    console.log(`\nManager ${answer.manager_name}'s employees:\n`)
    console.table(rows);
}

async function viewEmployeeByDepartment(){
    let departmentList = await getDepartmentList();
    let answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_name',
            message: `Which department's employees would you like to view?`,
            choices: departmentList
        }
    ])
    let department_id = await getDepartmentId(answer.department_name);
    let whereClause = await getRoleIdsByDepartment(department_id);
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
            FROM role
            JOIN department ON role.department_id = department.id
            JOIN employee ON role.id = employee.role_id
            LEFT JOIN employee m ON m.id = employee.manager_id
            ${whereClause}`)
    db.end();
    console.log(`\n${answer.department_name} department employees:\n`);
    console.table(rows);
}

async function budgetByDepartment(){
    let departmentList = await getDepartmentList();
    let answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_name',
            message: `Which department's employees would you like to view?`,
            choices: departmentList
        }
    ])
    let department_id = await getDepartmentId(answer.department_name);
    let whereClause = await getRoleIdsByDepartment(department_id);
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT SUM(role.salary) AS ${answer.department_name}_budget
            FROM role
            JOIN department ON role.department_id = department.id
            JOIN employee ON role.id = employee.role_id
            LEFT JOIN employee m ON m.id = employee.manager_id
            ${whereClause}`)
    db.end();
    console.log(`\n${answer.department_name} department total utilized budget:\n`);
    console.table(rows);
}

module.exports = {
    budgetByDepartment,
    viewEmployeeByManager,
    viewEmployeeByDepartment
};