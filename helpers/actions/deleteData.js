const inquirer = require('inquirer');
const alterData = require('./sql/alterData');
const {getDepartmentList, getRoleList, getEmployeeList} = require('./sql/getData');


async function deleteDepartment(){
    let departmentList = await getDepartmentList();
    let answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_name',
            message: 'What is the name of the department you want to delete?',
            choices: departmentList
        }
    ])
    let confirm = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm_delete',
            message: `Are you sure you want to delete ${answer.department_name} (THIS CANNOT BE UNDONE)`
        }
    ])
    if(confirm.confirm_delete){
        await alterData.deleteDepartment(answer.department_name);
        console.log(`\nRemoved the department '${answer.department_name}' from the database\n`);
    } else{
        console.log(`\nDelete has been cancelled\n`);
    }
}

async function deleteRole(){
    let roleList = await getRoleList();
    let answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'role_title',
            message: 'What is the name of the role you want to delete?',
            choices: roleList
        }
    ])
    let confirm = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm_delete',
            message: `Are you sure you want to delete ${answer.role_title} (THIS CANNOT BE UNDONE)`
        }
    ])
    if(confirm.confirm_delete){
        await alterData.deleteRole(answer.role_title);
        console.log(`\nRemoved the role '${answer.role_title}' from the database\n`);
    } else{
        console.log(`\nDelete has been cancelled\n`);
    }
}

async function deleteEmployee(){
    let employeeList = await getEmployeeList();
    let answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_name',
            message: 'What is the name of the employee you want to delete?',
            choices: employeeList
        }
    ])
    let confirm = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm_delete',
            message: `Are you sure you want to delete ${answer.employee_name} (THIS CANNOT BE UNDONE)`
        }
    ])
    if(confirm.confirm_delete){
        await alterData.deleteEmployee(answer.employee_name);
        console.log(`\nRemoved the employee '${answer.employee_name}' from the database\n`);
    } else{
        console.log(`\nDelete has been cancelled\n`);
    }
}

module.exports = {  
    deleteDepartment,
    deleteRole,
    deleteEmployee
};