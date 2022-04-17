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

// async function getAllRolesByDept() {
//   console.log('entered getAllRoles()')
//   const sql = `SELECT * FROM role WHERE `;

//   try {
//     const response = await db.query(sql);
//     return {message: 'success', response: response[0]}
//   } catch (err) {
//     console.error(err)
//     return {message: 'Error: Unable to process get all roles request.'}
//   }
// }

module.exports = {
  getAllEmployees,
  getAllDepartments
}