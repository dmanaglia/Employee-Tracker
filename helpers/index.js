const {viewDepartments, viewRoles, viewEmployees} = require('./printData');
const {addDepartment, addRole, addEmployee} = require('./addData');
const updateEmployeeRole = require('./updateData');

const allHelpers = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
}

module.exports = allHelpers;