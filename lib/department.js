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


module.exports = {
  getAllDepartments,
  addDepartment
}