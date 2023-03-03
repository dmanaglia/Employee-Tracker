const inquirer = require('inquirer');
const alterData = require('./sql/alterData');
const {getDepartmentList, getDepartmentId, getRoleList, getEmployeeList, getRoleId, getEmployeeId} = require('./sql/getData');

async function addDepartment(){
    let answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'What is the name of the department?',
            validate: function(input){
                if(!input){
                    return 'Department name must contain at least one letter';
                } else {
                    return true;
                }
            }
        }
    ])
    await alterData.addDepartment(answer.department_name.trim())
    console.log(`\nAdded ${answer.department_name.trim()} to the database\n`);
}

async function addRole(){
    let departmentList = await getDepartmentList();
    departmentList.splice(0, 0, 'None');
    let answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'role_title',
            message: 'What is the title of the role?',
            validate: function(input){
                if(!input){
                    return 'Role title must contain at least one letter';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
            validate: function(input){
                if(isNaN(input)){
                    return 'Salary must be a readable number';
                } else if(!input){
                    return 'Enter 0 if job is unpaid';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'list',
            name: 'department_name',
            message: 'Which department does the role belong to?',
            choices: departmentList
        }
    ])
    let department_id = await getDepartmentId(answer.department_name)
    await alterData.addRole(answer.role_title.trim(), answer.salary, department_id);
    if(department_id){
        console.log(`\nAdded ${answer.role_title.trim()} to the ${answer.department_name} department\n`);
    } else {
        console.log(`\nAdded ${answer.role_title.trim()} to the database\n`);
    }
}

async function addEmployee(){
    let roleList = await getRoleList();
    let potentialManagerList = await getEmployeeList();
    potentialManagerList.splice(0, 0, 'None');
    let answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: `What is the employee's first name?`,
            validate: function(input){
                if(!input){
                    return 'First name must contain at least one letter';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: `What is the employee's last name?`,
            validate: function(input){
                if(!input){
                    return 'Last name must contain at least one letter';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'list',
            name: 'role_title',
            message: `What is the employee's role?`,
            choices: roleList
        },
        {
            type: 'list',
            name: 'manager_name',
            message: `Who is the employee's manager?`,
            choices: potentialManagerList
        }

    ])
    let role_id = await getRoleId(answer.role_title);
    let manager_id = await getEmployeeId(answer.manager_name);
    await alterData.addEmployee(answer.firstName.trim(), answer.lastName.trim(), role_id, manager_id)
    console.log(`\nAdded ${answer.firstName.trim()} ${answer.lastName.trim()} to the database\n`);
}

module.exports = {
    addDepartment,
    addRole,
    addEmployee
};