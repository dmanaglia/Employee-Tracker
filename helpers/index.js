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
    updateEmployeeManager} = require('./updateData');

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
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    viewEmployeeByManager,
    viewEmployeeByDepartment,
    budgetByDepartment
}

module.exports = allHelpers;