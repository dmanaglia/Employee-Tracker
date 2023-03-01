const mysql = require('mysql2');
const inquirer = require('inquirer');

async function updateEmployeeRole(){
    let roleList = [];
    let employeeList = [];
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
        for(role of rows){
            roleList.push(role.title);
        }
    });
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
            message: `Which employee's role do you want to update?`,
            choices: employeeList
        },
        {
            type: 'list',
            name: 'role_title',
            message: 'Which role do you want to assign to the selected employee?',
            choices: roleList
        }

    ])
    .then(async (answer) => {
        let role_id;
        await db.promise().query(`SELECT id from role where title='${answer.role_title}'`)
        .then(([rows,fields]) => {
            role_id = rows[0].id;
        });
        let employee_names = answer.employee_name.split(' ');
        return db.promise().query(`UPDATE employee SET role_id = ${role_id} WHERE first_name='${employee_names[0]}' AND last_name='${employee_names[1]}'`)
        .then(() => {
            console.log(`Updated ${answer.employee_name}'s role to ${answer.role_title}`);
        })
        .then(() => {
            db.end();
        });
    });
}

async function updateEmployeeManager(){
    let managerList = ['None'];
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
            managerList.push(employee.first_name + ' ' + employee.last_name);
        }
    });
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'employee_name',
            message: `Which employee's manager do you want to update?`,
            choices: employeeList
        },
        {   
            //create a check to ensure an employee's manager cannot be themseleves?
            type: 'list',
            name: 'manager_name',
            message: 'Which employee would you like to assign as manager?',
            choices: managerList
        }
    ])
    .then(async (answer) => {
        let manager_id = null;
        if(answer.manager_name !== 'None'){
            let manager_names = answer.manager_name.split(' ');
            await db.promise().query(`SELECT id FROM employee WHERE first_name='${manager_names[0]}' AND last_name='${manager_names[1]}'`)
            .then(([rows,fields]) => {
                manager_id = rows[0].id;
            });
        }
        let employee_names = answer.employee_name.split(' ');
        return db.promise().query(`UPDATE employee SET manager_id = ${manager_id} WHERE first_name='${employee_names[0]}' AND last_name='${employee_names[1]}'`)
        .then(() => {
            console.log(`Updated ${answer.employee_name}'s manager to ${answer.manager_name}`);
        })
        .then(() => {
            db.end();
        });
    });
}

module.exports = {  
    updateEmployeeRole, 
    updateEmployeeManager
};