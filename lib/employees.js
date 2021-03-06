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

async function viewManagerEmployees(managerId) {
  console.log('entered viewManagerEmployees()')
  const sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, role.title, role.salary, department.name AS department_name
  FROM employee
    LEFT JOIN employee manager ON  manager.id = employee.manager_id
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
  WHERE employee.manager_id = ?`;
  const params = [managerId]
  try {
    const response = await db.query(sql, params);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {message: 'Error: Unable to process get view manager employees request.'}
  }
}

async function viewDeptEmployees(departmentId) {
  console.log('entered viewDeptEmployees()')
  const sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name, role.title, role.salary, department.name AS department_name
  FROM employee
    LEFT JOIN employee manager ON  manager.id = employee.manager_id
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
  WHERE department.id = ?`;
  const params = [departmentId]
  try {
    const response = await db.query(sql, params);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {message: 'Error: Unable to process get view department employees request.'}
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

async function updateEmpManager(employeeInfo) {
  console.log('entered updateEmpManager(): employeeInfo', employeeInfo)
  const sql = `UPDATE employee 
  SET manager_id=?
  WHERE id=?`;
  const params = [employeeInfo.manager_id, employeeInfo.employee_id]
  console.log("params: ", params)
  try {
    const response = await db.query(sql, params);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {
      message: `Error: Unable to process update employee manager request.`
    }
  }
}

async function deleteEmployee(employeeId) {
  console.log('entered deleteEmployee(): employeeId', employeeId)
  // Removing foreign key is required if deleting an employee with manager.
  const sql1 = `SET FOREIGN_KEY_CHECKS=0;`
  const sql2 = `DELETE FROM employee 
  WHERE id=?;`;
  const sql3 = `SET FOREIGN_KEY_CHECKS=1;`;
  const params = [employeeId]
  console.log("params: ", params)
  try {
    await db.query(sql1);
    const response = await db.query(sql2, params);
    await db.query(sql3);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {
      message: `Error: Unable to process delete employee request.`
    }
  }
}

module.exports = {
  viewAllEmployees,
  viewManagerEmployees,
  viewDeptEmployees,
  getAllEmployees,
  getAllEmployeesByDept,
  addEmployee,
  updateEmployee,
  updateEmpManager,
  deleteEmployee
}