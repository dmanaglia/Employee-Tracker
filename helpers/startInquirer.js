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
                      'Update an employee manager',
                      'Delete department',
                      'Delete role',
                      'Delete employee',
                      'View employees by manager',
                      'View employees by department',
                      'Get total utilized budget by department',
                      'Quit']
        }
    ])
    .then((answers) => {
        switch (answers.action) {
            case 'View all departments':
                console.log();
                allHelpers.viewDepartments()
                .then(() => start());
                break;
            case 'View all roles':
                console.log();
                allHelpers.viewRoles()
                .then(() => start());
                break;
            case 'View all employees':
                console.log();
                allHelpers.viewEmployees()
                .then(() => start());
                break;
            case 'Add a department':
                console.log();
                allHelpers.addDepartment()
                .then(() => start());
                break;
            case 'Add a role':
                console.log();
                allHelpers.addRole()
                .then(() => start());
                break;
            case 'Add an employee':
                console.log();
                allHelpers.addEmployee()
                .then(() => start());
                break;
            case 'Update an employee role':
                console.log();
                allHelpers.updateEmployeeRole()
                .then(() => start());
                break;
            case 'Update an employee manager':
                console.log();
                allHelpers.updateEmployeeManager()
                .then(() => start());
                break;
            case 'Delete department':
                console.log();
                allHelpers.deleteDepartment()
                .then(() => start());
                break;
            case 'Delete role':
                console.log();
                allHelpers.deleteRole()
                .then(() => start());
                break;
            case 'Delete employee':
                console.log();
                allHelpers.deleteEmployee()
                .then(() => start());
                break;
            case 'View employees by manager':
                console.log();
                allHelpers.viewEmployeeByManager()
                .then(() => start());
                break;
            case 'View employees by department':
                console.log();
                allHelpers.viewEmployeeByDepartment()
                .then(() => start());
                break;
            case 'Get total utilized budget by department':
                console.log();
                allHelpers.budgetByDepartment()
                .then(() => start());
                break;
            default:
                console.log();
                console.log("Bye");
                break;
        }
    })
}

module.exports = start;