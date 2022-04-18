const res = require('express/lib/response');
const db = require('../db/connection');

async function getAllEmployees() {
  console.log('entered getAllEmployees()')
  const sql = `SELECT * FROM employee`;

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
  getAllEmployees,
  getAllDepartments,
  getAllRoles,
  getAllRolesByDept,
  getAllEmployeesByDept,
  addEmployee
}