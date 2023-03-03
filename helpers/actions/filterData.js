const inquirer = require('inquirer');
const cTable = require('console.table');
const alterData = require('./sql/alterData');
const {getManagerList, getEmployeeId, getDepartmentList, getDepartmentId} = require('./sql/getData')

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
    console.log(`\nManager ${answer.manager_name}'s employees:\n`)
    console.table(await alterData.viewEmployeeByManager(await getEmployeeId(answer.manager_name)));
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
    console.log(`\n${answer.department_name} department employees:\n`);
    console.table(await alterData.viewEmployeeByDepartment(await getDepartmentId(answer.department_name)));
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
    console.log(`\n${answer.department_name} department total utilized budget:\n`);
    console.table(await alterData.viewBudgetByDepartment(answer.department_name));
}

module.exports = {
    budgetByDepartment,
    viewEmployeeByManager,
    viewEmployeeByDepartment
};