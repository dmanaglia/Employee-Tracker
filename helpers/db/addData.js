const mysql = require('mysql2');
const inquirer = require('inquirer');
const {getDepartmentList, getDepartmentId, getRoleList, getEmployeeList, getRoleId, getEmployeeId} = require('./myData');

async function addDepartment(){
    await inquirer.prompt([
        {
            type: 'input',
            name: 'dep_name',
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
    .then(async (answer) => {
        let db = mysql.createConnection({ host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
        await db.promise().query(`INSERT INTO department(name) VALUES ('${answer.dep_name}')`)
        .then(() => {
            db.end();
            console.log();
            console.log(`Added ${answer.dep_name} to the database`);
        });
    });
}

async function addRole(){
    let departmentList = await getDepartmentList();
    departmentList.splice(0, 0, 'None');
    await inquirer.prompt([
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
    .then(async (answer) => {
        let department_id = await getDepartmentId(answer.department_name)
        const db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
        await db.promise().query(`INSERT INTO role(title, salary, department_id) VALUES ('${answer.role_title}', ${answer.salary}, ${department_id})`)
        .then(() => {
            db.end();
            console.log();
            if(department_id){
                console.log(`Added ${answer.role_title} to the ${answer.department_name} department`);
            } else {
                console.log(`Added ${answer.role_title} to the database`);
            }
        });
    });
}

async function addEmployee(){
    let roleList = await getRoleList();
    let potentialManagerList = await getEmployeeList();
    potentialManagerList.splice(0, 0, 'None');
    await inquirer.prompt([
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
    .then(async (answer) => {
        let role_id = await getRoleId(answer.role_title);
        let manager_id = await getEmployeeId(answer.manager_name);
        let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
        await db.promise().query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${role_id}, ${manager_id})`)
        .then(() => {
            db.end();
            console.log();
            console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
        });
    });
}

module.exports = {
    addDepartment,
    addRole,
    addEmployee
};