const res = require('express/lib/response');
const db = require('../db/connection');

async function viewAllEmployees() {
  console.log('entered viewAllEmployees()')
  const sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, role.title, role.salary, department.name AS department_name
  FROM employee
    LEFT JOIN employee manager ON  manager.id = employee.manager_id
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id`;

  try {
    const response = await db.query(sql);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {message: 'Error: Unable to process get all employees request.'}
  }
}

async function getAllEmployees() {
  console.log('entered getAllEmployees()')
  const sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

  try {
    const response = await db.query(sql);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {message: 'Error: Unable to process get all employees request.'}
  }
}

async function getAllDepartments() {
  console.log('entered getAllDepartments()')
  const sql = `SELECT * FROM department`;

  try {
    const response = await db.query(sql);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {message: 'Error: Unable to process get all departments request.'}
  }
}

async function getAllRolesByDept(departmentId) {
  console.log('entered getAllRolesByDept() departmentId:', departmentId)
  const sql = `SELECT * FROM role WHERE department_id = ?`;
  const params = [departmentId]
  console.log("params: ", params)
  try {
    const response = await db.query(sql, params);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {
      message: `Error: Unable to process get all roles by department id ${departmentId} request.`
    }
  }
}

async function getAllEmployeesByDept(departmentId) {
  console.log('entered getAllEmployeesByDept() departmentId:', departmentId)
  const sql = `SELECT employee.id AS employee_id, employee.first_name AS first_name, employee.last_name AS last_name FROM employee 
  JOIN role ON employee.role_id = role.id 
  WHERE role.department_id = ?`;
  const params = [departmentId]
  try {
    const response = await db.query(sql, params);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {
      message: `Error: Unable to process get all employees by department id ${departmentId} request.`
    }
  }
}

async function addEmployee(employeeInfo) {
  console.log('entered addEmployee(): employeeInfo', employeeInfo)
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES 
    ( ? , ? , ?, ?);`;
  const params = [employeeInfo.first_name, employeeInfo.last_name, employeeInfo.role_id, employeeInfo.manager_id]
  console.log("params: ", params)
  try {
    const response = await db.query(sql, params);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {
      message: `Error: Unable to process add employee request.`
    }
  }
}

async function updateEmployee(employeeInfo) {
  console.log('entered updateEmployee(): employeeInfo', employeeInfo)
  const sql = `UPDATE employee 
  SET role_id=?
  WHERE id=?`;
  const params = [employeeInfo.role_id, employeeInfo.employee_id]
  console.log("params: ", params)
  try {
    const response = await db.query(sql, params);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {
      message: `Error: Unable to process update employee request.`
    }
  }
}

async function addRole(roleInfo) {
  console.log('entered addRole(): roleInfo', roleInfo)
  const sql = `INSERT INTO role (title, salary, department_id)
  VALUES 
    ( ?, ?, ? );`;
  const params = [roleInfo.role_title, roleInfo.role_salary, roleInfo.department_id]
  console.log("params: ", params)
  try {
    const response = await db.query(sql, params);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {
      message: `Error: Unable to process add role request.`
    }
  }
}

async function addDepartment(departmentInfo) {
  console.log('entered addDepartment(): departmentInfo', departmentInfo)
  const sql = `INSERT INTO department (name)
  VALUES 
    ( ? );`;
  const params = [departmentInfo.department_name]
  console.log("params: ", params)
  try {
    const response = await db.query(sql, params);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {
      message: `Error: Unable to process add department request.`
    }
  }
}

async function getAllRoles() {
  console.log('entered getAllRoles()')
  const sql = `SELECT role.id, role.title AS role_title, department.name AS department_name, role.salary AS salary FROM role
  JOIN department ON role.department_id = department.id`;

  try {
    const response = await db.query(sql);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {message: 'Error: Unable to process get all roles request.'}
  }
}

module.exports = {
  viewAllEmployees,
  getAllEmployees,
  getAllDepartments,
  getAllRoles,
  getAllRolesByDept,
  getAllEmployeesByDept,
  addEmployee,
  updateEmployee,
  addRole,
  addDepartment
}