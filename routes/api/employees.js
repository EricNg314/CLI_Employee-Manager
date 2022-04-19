const router = require('express').Router();
const { 
  viewAllEmployees,
  getAllEmployees,
  getAllEmployeesByDept, 
  addEmployee,
  updateEmployee } = require('../../lib/employees');
const { 
  getAllRolesByDept,
  addRole,
  getAllRoles } = require('../../lib/role');
const { 
  getAllDepartments,
  addDepartment } = require('../../lib/department');

// viewAll route includes details full details.
router.get('/employees/viewAll', async function(req,res) {
  console.log('entered route /api/employees/viewAll')
  const info = await viewAllEmployees();
  // console.log('info')
  console.log('info from viewAllEmployees:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: info.response
    });
  }
})

router.get('/employees/all', async function(req,res) {
  console.log('entered route /api/employees/all')
  const info = await getAllEmployees();
  // console.log('info')
  console.log('info from getAllEmployees:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: info.response
    });
  }
})

router.get('/employees/departments/all', async function(req,res) {
  console.log('entered route /api/employees/departments/all')
  const info = await getAllDepartments();
  // console.log('info')
  console.log('info from getAllDepartments:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: info.response
    });
  }
})

router.get('/employees/role/viewAll', async function(req,res) {
  console.log('entered route /api/employees/role/viewAll')
  const info = await getAllRoles();
  // console.log('info')
  console.log('info from getAllRoles:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: info.response
    });
  }
})

router.post('/employees/role/add', async function(req,res) {
  console.log('entered route /api/employees/role/add')
  console.log('req.body: ', req.body)
  const info = await addRole(req.body);
  // console.log('info')
  console.log('info from addRole:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: {
        message: `Added ${req.body.role_title} with ${req.body.role_salary} to ${req.body.department_name}`
      }
    });
  }
})

router.get('/employees/role/byDepartment', async function(req,res) {
  console.log('entered route /api/employees/role/byDepartment')
  console.log('req.query.id: ', req.query.id)
  const info = await getAllRolesByDept(req.query.id);
  // console.log('info')
  console.log('info from getAllRolesByDept:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: info.response
    });
  }
})

router.get('/employees/byDepartment', async function(req,res) {
  console.log('entered route /api/employees/byDepartment')
  console.log('req.query.id: ', req.query.id)
  const info = await getAllEmployeesByDept(req.query.id);
  // console.log('info')
  console.log('info from getAllEmployeesByDept:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: info.response
    });
  }
})

router.post('/employees/add', async function(req,res) {
  console.log('entered route /api/employees/add')
  console.log('req.body: ', req.body)
  const info = await addEmployee(req.body);
  console.log('info from addEmployee:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: {
        message: `Added ${req.body.first_name} ${req.body.last_name} to ${req.body.manager_name} as ${req.body.role_title}`
      }
    });
  }
})

router.post('/employees/update', async function(req,res) {
  console.log('entered route /api/employees/update')
  console.log('req.body: ', req.body)
  const info = await updateEmployee(req.body);
  console.log('info from updateEmployee:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: {
        message: `Updated ${req.body.first_name} ${req.body.last_name} as ${req.body.role_title}`
      }
    });
  }
})

router.post('/employees/department/add', async function(req,res) {
  console.log('entered route /api/employees/department/add')
  console.log('req.body: ', req.body)
  const info = await addDepartment(req.body);
  console.log('info from addDepartment:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: {
        message: `Added ${req.body.first_name} ${req.body.last_name} to ${req.body.manager_name} as ${req.body.role_title}`
      }
    });
  }
})

module.exports = router;