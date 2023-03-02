const inquirer = require('inquirer');
const cTable = require('console.table');
const allHelpers = require('./db');

function start(){
    inquirer.prompt([
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
                      `Update a job's department`,
                      `Update a job's salary`,
                      'Delete department',
                      'Delete role',
                      'Delete employee',
                      'View employees by manager',
                      'View employees by department',
                      'Get total utilized budget by department',
                      'Quit'],
            pageSize: 17,
            loop: false
        }
    ])
    .then(async (answers) => {
        switch (answers.action) {
            case 'View all departments':
                await allHelpers.viewDepartments();
                start();
                break;
            case 'View all roles':
                await allHelpers.viewRoles();
                start();
                break;
            case 'View all employees':
                await allHelpers.viewEmployees();
                start();
                break;
            case 'Add a department':
                await allHelpers.addDepartment();
                start();
                break;
            case 'Add a role':
                await allHelpers.addRole();
                start();
                break;
            case 'Add an employee':
                await allHelpers.addEmployee();
                start();
                break;
            case 'Update an employee role':
                await allHelpers.updateEmployeeRole();
                start();
                break;
            case 'Update an employee manager':
                await allHelpers.updateEmployeeManager();
                start();
                break;
            case `Update a job's department`:
                await allHelpers.updateRoleDepartment();
                start();
                break;
            case `Update a job's salary`:
                await allHelpers.updateRoleSalary();
                start();
                break;
            case 'Delete department':
                await allHelpers.deleteDepartment();
                start();
                break;
            case 'Delete role':
                await allHelpers.deleteRole();
                start();
                break;
            case 'Delete employee':
                await allHelpers.deleteEmployee();
                start();
                break;
            case 'View employees by manager':
                await allHelpers.viewEmployeeByManager();
                start();
                break;
            case 'View employees by department':
                await allHelpers.viewEmployeeByDepartment();
                start();
                break;
            case 'Get total utilized budget by department':
                await allHelpers.budgetByDepartment();
                start();
                break;
            default:
                break;
        }
    })
}

module.exports = start;