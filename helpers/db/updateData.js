const mysql = require('mysql2');
const inquirer = require('inquirer');
const {getEmployeeList, getRoleList, getRoleId, getEmployeeId, getDepartmentList, getDepartmentId} = require('./myData');

async function updateEmployeeRole(){
    let employeeList = await getEmployeeList();
    let roleList = await getRoleList();
    await inquirer.prompt([
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
        let role_id = await getRoleId(answer.role_title);
        let employee_names = answer.employee_name.split(' ');
        let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
        await db.promise().query(`UPDATE employee SET role_id = ${role_id} WHERE first_name='${employee_names[0]}' AND last_name='${employee_names[1]}'`)
        .then(() => {
            db.end();
            console.log();
            console.log(`Updated ${answer.employee_name}'s role to ${answer.role_title}`);
        });
    });
}

async function updateEmployeeManager(){
    let employeeList = await getEmployeeList();
    let managerList = [...employeeList];
    managerList.splice(0, 0, 'None');
    await inquirer.prompt([
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
        let manager_id = await getEmployeeId(answer.manager_name);
        let employee_names = answer.employee_name.split(' ');
        let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
        await db.promise().query(`UPDATE employee SET manager_id = ${manager_id} WHERE first_name='${employee_names[0]}' AND last_name='${employee_names[1]}'`)
        .then(() => {
            db.end();
            console.log();
            console.log(`Updated ${answer.employee_name}'s manager to ${answer.manager_name}`);
        });
    });
}

async function updateRoleDepartment(){
    let roleList = await getRoleList();
    let departmentList = await getDepartmentList();
    departmentList.splice(0, 0, 'None');
    await inquirer.prompt([
        {
            type: 'list',
            name: 'role_title',
            message: `Which role do you want to update?`,
            choices: roleList
        },
        {
            type: 'list',
            name: 'department_name',
            message: 'To which department do you want to reassign this role?',
            choices: departmentList
        }
    ])
    .then(async (answer) => {
        let department_id = await getDepartmentId(answer.department_name);
        let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
        await db.promise().query(`UPDATE role SET department_id = ${department_id} WHERE title = '${answer.role_title}'`)
        .then(() => {
            db.end();
            console.log();
            console.log(`Updated ${answer.role_title} department to ${answer.department_name}`);
        });
    });
}

async function updateRoleSalary(){
    let roleList = await getRoleList();
    await inquirer.prompt([
        {
            type: 'list',
            name: 'role_title',
            message: `Which role do you want to update?`,
            choices: roleList
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the new salary of the role?',
            validate: function(input){
                if(isNaN(input)){
                    return 'Salary must be a readable number';
                } else if(!input){
                    return 'Enter 0 if job is unpaid';
                } else {
                    return true;
                }
            }
        }
    ])
    .then(async (answer) => {
        let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
        await db.promise().query(`UPDATE role SET salary = ${answer.salary} WHERE title = '${answer.role_title}'`)
        .then(() => {
            db.end();
            console.log();
            console.log(`Updated ${answer.role_title} department to ${answer.department_name}`);
        });
    });
}

module.exports = {  
    updateEmployeeRole, 
    updateEmployeeManager,
    updateRoleDepartment,
    updateRoleSalary
};