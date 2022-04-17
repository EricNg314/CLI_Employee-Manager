const res = require('express/lib/response');
const db = require('../db/connection');

async function getAllEmployees() {
  console.log('entered getAllEmployees()')
  const sql = `SELECT * FROM employee`;

  try {
    const result = await db.query(sql);
    return {message: 'success', result: result[0]}
  } catch (err) {
    console.error(err)
    return {message: 'Error: Unable to process get all employees request.'}
  }

}

module.exports = {
  getAllEmployees
}