const { 
    viewDepartments, 
    viewRoles, 
    viewEmployees} = require('./printData');

const { 
    addDepartment, 
    addRole, 
    addEmployee} = require('./addData');

const { 
    updateEmployeeRole,
    updateEmployeeManager,
    updateRoleDepartment,
    updateRoleSalary} = require('./updateData');

const {
    deleteDepartment,
    deleteRole,
    deleteEmployee} = require('./deleteData');

const {
    budgetByDepartment, 
    viewEmployeeByManager, 
    viewEmployeeByDepartment} = require('./filterData');

const allHelpers = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    updateRoleDepartment,
    updateRoleSalary,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    budgetByDepartment,
    viewEmployeeByManager,
    viewEmployeeByDepartment
}

module.exports = allHelpers;