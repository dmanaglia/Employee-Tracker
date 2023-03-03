const db = require('../../../config/connection');
const {getRoleIdsByDepartment, getDepartmentId} = require('./getData');

class AlterData {
    constructor(){
        this.db = db.promise()
    }
    async viewDepartments(){
        let [rows] = await this.db.query(`SELECT * FROM department`);
        return rows;
    }
    async viewRoles(){
        let [rows] = await this.db.query(`SELECT role.id, role.title, department.name AS department, role.salary
                                               FROM role
                                               LEFT JOIN department ON role.department_id = department.id`)
        return rows;
    }
    async viewEmployees(){
        let [rows] = await this.db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
                                               FROM role
                                               LEFT JOIN department ON role.department_id = department.id
                                               RIGHT JOIN employee ON role.id = employee.role_id
                                               LEFT JOIN employee m ON m.id = employee.manager_id`)
        return rows;
    }
    async addDepartment(name){
        await this.db.query(`INSERT INTO department(name) VALUES ('${name}')`);
    }
    async addRole(title, salary, departmentId){
        await this.db.query(`INSERT INTO role(title, salary, department_id) VALUES ('${title}', ${salary}, ${departmentId})`);
    }
    async addEmployee(firstName, lastName, roleId, managerId){
        await this.db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId})`);
    }
    async updateEmployeeRole(employeeName, roleId){
        let employee_names = employeeName.split(' ');
        await this.db.query(`UPDATE employee SET role_id = ${roleId} WHERE first_name='${employee_names[0]}' AND last_name='${employee_names[1]}'`);
    }
    async updateEmployeeManager(employeeName, managerId){
        let employee_names = employeeName.split(' ');
        this.db.query(`UPDATE employee SET manager_id = ${managerId} WHERE first_name='${employee_names[0]}' AND last_name='${employee_names[1]}'`);
    }
    async updateRoleDepartment(title, departmentId){
        await this.db.query(`UPDATE role SET department_id = ${departmentId} WHERE title = '${title}'`)
    }
    async updateRoleSalary(salary, title){
        await this.db.query(`UPDATE role SET salary = ${salary} WHERE title = '${title}'`)
    }
    async deleteDepartment(name){
        await this.db.query(`DELETE FROM department WHERE name = ('${name}')`);
    }
    async deleteRole(title){
        await this.db.query(`DELETE FROM role WHERE title = ('${title}')`);
    }
    async deleteEmployee(fullName){
        let employeeNames = fullName.split(' ');
        await this.db.query(`DELETE FROM employee WHERE first_name='${employeeNames[0]}' AND last_name='${employeeNames[1]}'`);
    }
    async viewEmployeeByManager(managerId){
        let [rows] = await this.db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary
                                               FROM role
                                               JOIN department ON role.department_id = department.id
                                               JOIN employee ON role.id = employee.role_id
                                               LEFT JOIN employee m ON m.id = employee.manager_id
                                               WHERE employee.manager_id = ${managerId}`);
        return rows;
    }
    async viewEmployeeByDepartment(departmentId){
        let whereClause = await getRoleIdsByDepartment(departmentId);
        let [rows] = await this.db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
                                               FROM role
                                               JOIN department ON role.department_id = department.id
                                               JOIN employee ON role.id = employee.role_id
                                               LEFT JOIN employee m ON m.id = employee.manager_id
                                               ${whereClause}`);
        return rows;
    }
    async viewBudgetByDepartment(departmentName){
        let whereClause = await getRoleIdsByDepartment(await getDepartmentId(departmentName));
        departmentName = departmentName.replaceAll(' ', '_')
        let [rows] =  await this.db.query(`SELECT SUM(role.salary) AS ${departmentName}_Budget
                                                FROM role
                                                JOIN department ON role.department_id = department.id
                                                JOIN employee ON role.id = employee.role_id
                                                LEFT JOIN employee m ON m.id = employee.manager_id
                                                ${whereClause}`);
        return rows;
    }
}

const alterData = new AlterData();

module.exports = alterData;