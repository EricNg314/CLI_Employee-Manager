const router = require('express').Router();
const { getAllEmployees, getAllDepartments, getAllRolesByDept, getAllEmployeesByDept, addEmployee } = require('../../lib/employees')

router.get('/employees/viewAll', async function(req,res) {
  console.log('entered route /api/employees/viewAll')
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

router.get('/employees/roles/byDepartment', async function(req,res) {
  console.log('entered route /api/employees/roles/byDepartment')
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

// TODO: Create get employees by department route.
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

module.exports = router;