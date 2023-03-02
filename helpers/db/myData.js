const mysql = require('mysql2');

async function getDepartmentList(){
    let departmentList = [];
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT name FROM department`)
    for(dep of rows){
        departmentList.push(dep.name);
    }
    db.end();
    return departmentList;
}

async function getRoleList(){
    let roleList = [];
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT title FROM role`)
    for(role of rows){
        roleList.push(role.title);
    }
    db.end();
    return roleList;
}

async function getEmployeeList(){
    let employeeList = [];
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT first_name, last_name FROM employee`)
    for(employee of rows){
        employeeList.push(employee.first_name + ' ' + employee.last_name);
    }
    db.end();
    return employeeList;
}

async function getManagerList(){
    let managerIdList = [];
    let managerNameList = [];
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT id, first_name, last_name, manager_id FROM employee`)
    for(employee of rows){
        if(employee.manager_id !== null && !managerIdList.includes(employee.manager_id))
        managerIdList.push(employee.manager_id);
    }
    for(employee of rows){
        if(managerIdList.includes(employee.id)){
            managerNameList.push(employee.first_name + ' ' + employee.last_name);
        }
    }
    db.end();
    return managerNameList;
}

async function getDepartmentId(name){
    let department_id = null;
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    if(name !== 'None'){
        let [rows] = await db.promise().query(`SELECT id from department where name='${name}'`)
        department_id = rows[0].id;
    }
    db.end();
    return department_id;
}

async function getRoleId(title){
    let role_id;
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT id from role where title='${title}'`)
    role_id = rows[0].id;
    db.end();
    return role_id;
}

async function getEmployeeId(name){
    let employee_id = null;
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    if(name !== "None"){
        let employee_names = name.split(' ');
        let [rows] = await db.promise().query(`SELECT id from employee where first_name='${employee_names[0]}' AND last_name='${employee_names[1]}'`)
        employee_id = rows[0].id;
    }
    db.end();
    return employee_id;
}

async function getRoleIdsByDepartment(id){
    let whereClause = `WHERE`;
    let db = mysql.createConnection({host: 'localhost', user: 'root', password: 'dannymanaglia', database: 'employees_db'});
    let [rows] = await db.promise().query(`SELECT id FROM role WHERE department_id = '${id}'`)
    for(role of rows){
        whereClause += ` employee.role_id = ${role.id} OR`
    }
    db.end();
    whereClause = whereClause.substring(0, whereClause.length - 3);
    return whereClause;
}

module.exports = {
    getDepartmentList,
    getRoleList,
    getEmployeeList,
    getManagerList,
    getDepartmentId,
    getRoleId,
    getEmployeeId,
    getRoleIdsByDepartment
}