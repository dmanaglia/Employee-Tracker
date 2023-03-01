const mysql = require('mysql2');
const inquirer = require('inquirer');

async function addDepartment(){
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'dep_name',
            message: 'What is the name of the department?'
        }
    ])
    .then(answer => {
        return db.promise().query(`INSERT INTO department(name) VALUES ('${answer.dep_name}')`)
        .then(([rows,fields]) => {
            console.log(`Added ${answer.dep_name} to the database`);
        })
        .then( () => {
            db.end();
        });
    });
}

async function addRole(){
    let departmentList = [];
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    await db.promise().query(`SELECT name FROM department`)
    .then(([rows,fields]) => {
        for(dep of rows){
            departmentList.push(dep.name);
        }
    });
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the role?',
            validate: function(input){
                if(typeof input !== 'number'){
                    return 'Salary must be a readable number';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'list',
            name: 'dep_name',
            message: 'Which department does the role belong to?',
            choices: departmentList
        }

    ])
    .then(async (answer) => {
        let dep_id;
        await db.promise().query(`SELECT id from department where name='${answer.dep_name}'`)
        .then(([rows,fields]) => {
            dep_id = rows[0].id;
        });
        return db.promise().query(`INSERT INTO role(title, salary, department_id) VALUES ('${answer.roleName}', ${answer.salary}, ${dep_id})`)
        .then(() => {
            console.log(`Added ${answer.roleName} to the ${answer.dep_name} department`);
        })
        .then(() => {
            db.end();
        });
    });
}

async function addEmployee(){
    let roleList = [];
    let managerList = ['None'];
    let db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'dannymanaglia',
          database: 'employees_db'
        }
    );
    await db.promise().query(`SELECT title FROM role`)
    .then(([rows,fields]) => {
        for(role of rows){
            roleList.push(role.title);
        }
    });
    await db.promise().query(`SELECT first_name, last_name FROM employee`)
    .then(([rows,fields]) => {
        for(employee of rows){
            managerList.push(employee.first_name + ' ' + employee.last_name);
        }
    });
    await inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: `What is the employee's first name?`
        },
        {
            type: 'input',
            name: 'lastName',
            message: `What is the employee's last name?`
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
            choices: managerList
        }

    ])
    .then(async (answer) => {
        let role_id;
        let manager_id = null;
        await db.promise().query(`SELECT id from role where title='${answer.role_title}'`)
        .then(([rows,fields]) => {
            role_id = rows[0].id;
        });
        if(answer.manager_name !== "None"){
            let manager_names = answer.manager_name.split(' ');
            await db.promise().query(`SELECT id from employee where first_name='${manager_names[0]}' AND last_name='${manager_names[1]}'`)
            .then(([rows,fields]) => {
                manager_id = rows[0].id;
            });
        }
        return db.promise().query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${role_id}, ${manager_id})`)
        .then(() => {
            console.log(`Added ${answer.firstName} ${answer.lastName} to the database`);
        })
        .then(() => {
            db.end();
        });
    });
}

module.exports = {
    addDepartment,
    addRole,
    addEmployee
};