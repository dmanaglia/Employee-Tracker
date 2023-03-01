const mysql = require('mysql2');
const inquirer = require('inquirer');

async function deleteDepartment(){
    let departmentList = [];
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
        for(dep of rows){
            departmentList.push(dep.name);
        }
    });
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'dep_name',
            message: 'What is the name of the department you want to delete?',
            choices: departmentList
            //add some sort of confirm/validation
        }
    ])
    .then(answer => {
        return db.promise().query(`DELETE FROM department WHERE name = ('${answer.dep_name}')`)
        .then(([rows,fields]) => {
            console.log(`Removed the department '${answer.dep_name}' from the database`);
        })
        .then( () => {
            db.end();
        });
    });
}

async function deleteRole(){
    let roleList = [];
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    await db.promise().query(`SELECT title FROM role`)
    .then(([rows,fields]) => {
        for(dep of rows){
            roleList.push(dep.name);
        }
    });
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'role_title',
            message: 'What is the name of the role you want to delete?',
            choices: roleList
            //add some sort of confirm/validation
        }
    ])
    .then(answer => {
        return db.promise().query(`DELETE FROM role WHERE title = ('${answer.role_title}')`)
        .then(([rows,fields]) => {
            console.log(`Removed the role '${answer.dep_name}' from the database`);
        })
        .then( () => {
            db.end();
        });
    });
}

async function deleteEmployee(){
    let employeeList = [];
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    await db.promise().query(`SELECT first_name, last_name FROM employee`)
    .then(([rows,fields]) => {
        for(employee of rows){
            employeeList.push(employee.first_name + ' ' + employee.last_name);
        }
    });
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee_name',
            message: 'What is the name of the employee you want to delete?',
            choices: employeeList
            //add some sort of confirm/validation
        }
    ])
    .then(answer => {
        let employee_names = answer.employee_name.split(' ');
        return db.promise().query(`DELETE FROM employee WHERE first_name='${employee_names[0]}' AND last_name='${employee_names[1]}'`)
        .then(([rows,fields]) => {
            console.log(`Removed the employee '${answer.employee_name}' from the database`);
        })
        .then( () => {
            db.end();
        });
    });
}

module.exports = {  
    deleteDepartment,
    deleteRole,
    deleteEmployee
};