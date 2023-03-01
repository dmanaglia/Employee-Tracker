const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

async function viewEmployeeByManager(){
    let managerIdList = [];
    let managerNameList = [];
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    await db.promise().query(`SELECT id, first_name, last_name, manager_id FROM employee`)
    .then(([rows,fields]) => {
        for(employee of rows){
            if(employee.manager_id !== null && !managerIdList.includes(employee.manager_id))
            managerIdList.push(employee.manager_id);
        }
        for(employee of rows){
            if(managerIdList.includes(employee.id)){
                managerNameList.push(employee.first_name + ' ' + employee.last_name);
            }
        }
    });

    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'manager_name',
            message: `Which manager's employees would you like to view?`,
            choices: managerNameList
        }
    ])
    .then(async (answer) => {
        let manager_id;
        let manager_names = answer.manager_name.split(' ');
        await db.promise().query(`SELECT id from employee WHERE first_name='${manager_names[0]}' AND last_name='${manager_names[1]}'`)
        .then(([rows,fields]) => {
            manager_id = rows[0].id;
        });
        return db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
                FROM role
                JOIN department ON role.department_id = department.id
                JOIN employee ON role.id = employee.role_id
                LEFT JOIN employee m ON m.id = employee.manager_id
                WHERE employee.manager_id = ${manager_id}`)
        .then(([rows,fields]) => {
            console.log(`Manager ${answer.manager_name}'s employees:`)
            console.table(rows);
        })
        .then( () => {
            db.end();
        });
    });
}

async function viewEmployeeByDepartment(){
    let departmentNameList = [];
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    await db.promise().query(`SELECT name FROM department`)
    .then(([rows,fields]) => {
        for(department of rows){
            departmentNameList.push(department.name);
        }
    });
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'department_name',
            message: `Which department's employees would you like to view?`,
            choices: departmentNameList
        }
    ])
    .then(async (answer) => {
        let department_id;
        let whereClause = `WHERE`;
        await db.promise().query(`SELECT id FROM department WHERE name = '${answer.department_name}'`)
        .then(([rows,fields]) => {
            department_id = rows[0].id;
        });
        await db.promise().query(`SELECT id FROM role WHERE department_id = '${department_id}'`)
        .then(([rows,fields]) => {
            for(role of rows){
                whereClause += ` employee.role_id = ${role.id} OR`
            }
        });
        whereClause = whereClause.substring(0, whereClause.length - 3);
        return db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
                FROM role
                JOIN department ON role.department_id = department.id
                JOIN employee ON role.id = employee.role_id
                LEFT JOIN employee m ON m.id = employee.manager_id
                ${whereClause}`)
        .then(([rows,fields]) => {
            console.log(`${answer.department_name} department employees:`)
            console.table(rows);
        })
        .then( () => {
            db.end();
        });
    });
}

async function budgetByDepartment(){
    let departmentNameList = [];
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    await db.promise().query(`SELECT name FROM department`)
    .then(([rows,fields]) => {
        for(department of rows){
            departmentNameList.push(department.name);
        }
    });
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'department_name',
            message: `Which department's employees would you like to view?`,
            choices: departmentNameList
        }
    ])
    .then(async (answer) => {
        let department_id;
        let whereClause = `WHERE`;
        await db.promise().query(`SELECT id FROM department WHERE name = '${answer.department_name}'`)
        .then(([rows,fields]) => {
            department_id = rows[0].id;
        });
        await db.promise().query(`SELECT id FROM role WHERE department_id = '${department_id}'`)
        .then(([rows,fields]) => {
            for(role of rows){
                whereClause += ` employee.role_id = ${role.id} OR`
            }
        });
        whereClause = whereClause.substring(0, whereClause.length - 3);
        return db.promise().query(`SELECT SUM(role.salary) AS ${answer.department_name}_budget
                FROM role
                JOIN department ON role.department_id = department.id
                JOIN employee ON role.id = employee.role_id
                LEFT JOIN employee m ON m.id = employee.manager_id
                ${whereClause}`)
        .then(([rows,fields]) => {
            console.table(rows);
        })
        .then( () => {
            db.end();
        });
    });
}

module.exports = {
    budgetByDepartment,
    viewEmployeeByManager,
    viewEmployeeByDepartment
};