const res = require('express/lib/response');
const db = require('../db/connection');


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

async function deleteDepartment(departmentId) {
  console.log('entered deleteDepartment(): departmentId', departmentId)
  const sql = `DELETE FROM department 
  WHERE id=?`;
  const params = [departmentId]
  console.log("params: ", params)
  try {
    const response = await db.query(sql, params);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {
      message: `Error: Unable to process delete department request.`
    }
  }
}


module.exports = {
  getAllDepartments,
  addDepartment,
  deleteDepartment
}