--display all departments
SELECT * FROM department;

--JOIN role table and department table
SELECT role.id, role.title, department.name AS department, role.salary
FROM role
JOIN department ON role.department_id = department.id;


--JOIN employee table with all foreign keys
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager
FROM role
JOIN department ON role.department_id = department.id
JOIN employee ON role.id = employee.role_id
LEFT JOIN employee m ON m.id = employee.manager_id;


--add department
INSERT INTO department(name) VALUES ('Service');

--add role
INSERT INTO role(title, salary, department_id) VALUES ('?', '?', '?');

--add employee
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ('?', '?', '?', '?');
console.log(`Added ${?} ${?} to the database`);

--update employee role
UPDATE employee SET role_id = ${?} WHERE id = ${?};
console.log(`Added ${?} ${?} to the database`);



SELECT
    SUM(role.salary) AS utilized_budget
FROM role
JOIN department ON role.department_id = department.id
JOIN employee ON role.id = employee.role_id
LEFT JOIN employee m ON m.id = employee.manager_id;




--self join for reference
SELECT
    CONCAT(e.first_name, ' ', e.last_name) staffer,
    CONCAT(m.first_name, ' ', m.last_name) manager
FROM
    employee e
LEFT JOIN employee m ON m.id = e.manager_id;
