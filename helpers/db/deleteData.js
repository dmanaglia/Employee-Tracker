const mysql = require('mysql2');
const inquirer = require('inquirer');
const {getDepartmentList, getRoleList, getEmployeeList} = require('./myData');

async function deleteDepartment(){
    let departmentList = await getDepartmentList();
    await inquirer.prompt([
        {
            type: 'list',
            name: 'department_name',
            message: 'What is the name of the department you want to delete?',
            choices: departmentList
        }
    ])
    .then(async (answer) => {
        await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm_delete',
                message: `Are you sure you want to delete ${answer.department_name} (THIS CANNOT BE UNDONE)`
            }
        ])
        .then(async (confirm) => {
            if(confirm.confirm_delete){
                let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
                await db.promise().query(`DELETE FROM department WHERE name = ('${answer.department_name}')`)
                .then(() => {
                    db.end();
                    console.log();
                    console.log(`Removed the department '${answer.department_name}' from the database`);
                });
            } else{
                console.log();
                console.log(`Delete has been cancelled`);
            }
        });
    });
}

async function deleteRole(){
    let roleList = await getRoleList();
    await inquirer
    .prompt([
        {
            type: 'list',
            name: 'role_title',
            message: 'What is the name of the role you want to delete?',
            choices: roleList
        }
    ])
    .then(async (answer) => {
        await inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'confirm_delete',
                message: `Are you sure you want to delete ${answer.role_title} (THIS CANNOT BE UNDONE)`
            }
        ])
        .then(async (confirm) => {
            if(confirm.confirm_delete){
                let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
                await db.promise().query(`DELETE FROM role WHERE title = ('${answer.role_title}')`)
                .then(() => {
                    db.end();
                    console.log();
                    console.log(`Removed the role '${answer.role_title}' from the database`);
                });
            } else{
                console.log();
                console.log(`Delete has been cancelled`);
            }
        });
    });
}

async function deleteEmployee(){
    let employeeList = await getEmployeeList();
    await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_name',
            message: 'What is the name of the employee you want to delete?',
            choices: employeeList
        }
    ])
    .then(async (answer) => {
        await inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'confirm_delete',
                message: `Are you sure you want to delete ${answer.employee_name} (THIS CANNOT BE UNDONE)`
            }
        ])
        .then(async (confirm) => {
            if(confirm.confirm_delete){
                let employee_names = answer.employee_name.split(' ');
                let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
                await db.promise().query(`DELETE FROM employee WHERE first_name='${employee_names[0]}' AND last_name='${employee_names[1]}'`)
                .then(() => {
                    db.end();
                    console.log();
                    console.log(`Removed the employee '${answer.employee_name}' from the database`);
                });
            } else{
                console.log();
                console.log(`Delete has been cancelled`);
            }
        });
    });
}

module.exports = {  
    deleteDepartment,
    deleteRole,
    deleteEmployee
};