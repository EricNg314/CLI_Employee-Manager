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
  const sql = `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name FROM employee 
  JOIN role ON employee.role_id = role.id 
  WHERE role.department_id = ?`;
  const params = [departmentId]
  console.log("params: ", params)
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

module.exports = {
  getAllEmployees,
  getAllDepartments,
  getAllRolesByDept,
  getAllEmployeesByDept
}