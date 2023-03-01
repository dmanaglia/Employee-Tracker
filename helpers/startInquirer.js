const inquirer = require('inquirer');
const cTable = require('console.table');
const allHelpers = require('./index');

function start(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments', 
                      'View all roles',
                      'View all employees',
                      'Add a department',
                      'Add a role',
                      'Add an employee',
                      'Update an employee role',
                      'Quit']
        }
    ])
    .then((answers) => {
        switch (answers.action) {
            case 'View all departments':
                allHelpers.viewDepartments()
                .then(() => start());
                break;
            case 'View all roles':
                allHelpers.viewRoles()
                .then(() => start());
                break;
            case 'View all employees':
                allHelpers.viewEmployees()
                .then(() => start());
                break;
            case 'Add a department':
                allHelpers.addDepartment()
                .then(() => start());
                break;
            case 'Add a role':
                allHelpers.addRole()
                .then(() => start());
                break;
            case 'Add an employee':
                allHelpers.addEmployee()
                .then(() => start());
                break;
            case 'Update an employee role':
                allHelpers.updateEmployeeRole()
                .then(() => start());
                break;
            default:
                console.log("Bye");
                break;
        }
    })
}

module.exports = start;