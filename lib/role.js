const res = require('express/lib/response');
const db = require('../db/connection');

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

async function deleteRole(roleId) {
  console.log('entered deleteRole(): roleId', roleId)
  // Removing foreign key is required if deleting a role with employees.
  const sql1 = `SET FOREIGN_KEY_CHECKS=0;`
  const sq2 = `DELETE FROM role 
  WHERE id=?`;
  const sql3 = `SET FOREIGN_KEY_CHECKS=1;`;
  const params = [roleId]
  console.log("params: ", params)
  try {
    await db.query(sql1);
    const response = await db.query(sq2, params);
    await db.query(sql3);
    return {message: 'success', response: response[0]}
  } catch (err) {
    console.error(err)
    return {
      message: `Error: Unable to process delete role request.`
    }
  }
}

module.exports = {
  getAllRoles,
  getAllRolesByDept,
  addRole,
  deleteRole
}