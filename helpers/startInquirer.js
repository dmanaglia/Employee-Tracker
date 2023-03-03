const inquirer = require('inquirer');
const cTable = require('console.table');
const allActions = require('./actions');
const db = require('../config/connection');

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
                await allActions.viewDepartments();
                start();
                break;
            case 'View all roles':
                await allActions.viewRoles();
                start();
                break;
            case 'View all employees':
                await allActions.viewEmployees();
                start();
                break;
            case 'Add a department':
                await allActions.addDepartment();
                start();
                break;
            case 'Add a role':
                await allActions.addRole();
                start();
                break;
            case 'Add an employee':
                await allActions.addEmployee();
                start();
                break;
            case 'Update an employee role':
                await allActions.updateEmployeeRole();
                start();
                break;
            case 'Update an employee manager':
                await allActions.updateEmployeeManager();
                start();
                break;
            case `Update a job's department`:
                await allActions.updateRoleDepartment();
                start();
                break;
            case `Update a job's salary`:
                await allActions.updateRoleSalary();
                start();
                break;
            case 'Delete department':
                await allActions.deleteDepartment();
                start();
                break;
            case 'Delete role':
                await allActions.deleteRole();
                start();
                break;
            case 'Delete employee':
                await allActions.deleteEmployee();
                start();
                break;
            case 'View employees by manager':
                await allActions.viewEmployeeByManager();
                start();
                break;
            case 'View employees by department':
                await allActions.viewEmployeeByDepartment();
                start();
                break;
            case 'Get total utilized budget by department':
                await allActions.budgetByDepartment();
                start();
                break;
            default:
                db.end();
                break;
        }
    })
}

module.exports = start;