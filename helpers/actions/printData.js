const cTable = require('console.table');
const alterData = require('./sql/alterData');

async function viewDepartments(){
    console.log();
    console.table(await alterData.viewDepartments());
}

async function viewRoles(){
    console.log();
    console.table(await alterData.viewRoles());
}

async function viewEmployees(){
    console.log();
    console.table(await alterData.viewEmployees());
}

module.exports = {  
    viewDepartments, 
    viewRoles, 
    viewEmployees
};