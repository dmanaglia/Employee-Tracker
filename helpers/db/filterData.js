const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {getManagerList, getEmployeeId, getDepartmentList, getDepartmentId, getRoleIdsByDepartment} = require('./myData')

async function viewEmployeeByManager(){
    let managerList = await getManagerList();
    await inquirer.prompt([
        {
            type: 'list',
            name: 'manager_name',
            message: `Which manager's employees would you like to view?`,
            choices: managerList
        }
    ])
    .then(async (answer) => {
        let manager_id = await getEmployeeId(answer.manager_name);
        let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
        await db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
                FROM role
                JOIN department ON role.department_id = department.id
                JOIN employee ON role.id = employee.role_id
                LEFT JOIN employee m ON m.id = employee.manager_id
                WHERE employee.manager_id = ${manager_id}`)
        .then(([rows]) => {
            db.end();
            console.log();
            console.log(`Manager ${answer.manager_name}'s employees:`)
            console.table(rows);
        });
    });
}

async function viewEmployeeByDepartment(){
    let departmentList = await getDepartmentList();
    await inquirer.prompt([
        {
            type: 'list',
            name: 'department_name',
            message: `Which department's employees would you like to view?`,
            choices: departmentList
        }
    ])
    .then(async (answer) => {
        let department_id = await getDepartmentId(answer.department_name);
        let whereClause = await getRoleIdsByDepartment(department_id);
        let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
        await db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
                FROM role
                JOIN department ON role.department_id = department.id
                JOIN employee ON role.id = employee.role_id
                LEFT JOIN employee m ON m.id = employee.manager_id
                ${whereClause}`)
        .then(([rows]) => {
            db.end();
            console.log();
            console.log(`${answer.department_name} department employees:`);
            console.table(rows);
        })
    });
}

async function budgetByDepartment(){
    let departmentList = await getDepartmentList();
    await inquirer.prompt([
        {
            type: 'list',
            name: 'department_name',
            message: `Which department's employees would you like to view?`,
            choices: departmentList
        }
    ])
    .then(async (answer) => {
        let department_id = await getDepartmentId(answer.department_name);
        let whereClause = await getRoleIdsByDepartment(department_id);
        let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
        await db.promise().query(`SELECT SUM(role.salary) AS ${answer.department_name}_budget
                FROM role
                JOIN department ON role.department_id = department.id
                JOIN employee ON role.id = employee.role_id
                LEFT JOIN employee m ON m.id = employee.manager_id
                ${whereClause}`)
        .then(([rows]) => {
            db.end();
            console.log();
            console.table(rows);
        });
    });
}

module.exports = {
    budgetByDepartment,
    viewEmployeeByManager,
    viewEmployeeByDepartment
};