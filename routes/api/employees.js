const router = require('express').Router();
const { 
  viewAllEmployees,
  viewManagerEmployees,
  viewDeptEmployees,
  getAllEmployees,
  getAllEmployeesByDept, 
  addEmployee,
  updateEmployee,
  updateEmpManager,
  deleteEmployee } = require('../../lib/employees');

// viewAll route includes details full details.
router.get('/employees/viewAll', async function(req,res) {
  console.log('entered route /api/employees/viewAll')
  const info = await viewAllEmployees();
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

router.get('/employees/viewManagerEmployees', async function(req,res) {
  console.log('entered route /api/employees/viewManagerEmployees')
  const info = await viewManagerEmployees(req.query.id);
  console.log('info from viewManagerEmployees:', info)
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

router.get('/employees/viewDepartmentEmployees', async function(req,res) {
  console.log('entered route /api/employees/viewDepartmentEmployees')
  const info = await viewDeptEmployees(req.query.id);
  console.log('info from viewDeptEmployees:', info)
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

router.get('/employees/byDepartment', async function(req,res) {
  console.log('entered route /api/employees/byDepartment')
  console.log('req.query.id: ', req.query.id)
  const info = await getAllEmployeesByDept(req.query.id);
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

router.post('/employees/updateManager', async function(req,res) {
  console.log('entered route /api/employees/updateManager')
  console.log('req.body: ', req.body)
  const info = await updateEmpManager(req.body);
  console.log('info from updateEmpManager:', info)
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

router.delete('/employees/delete', async function(req,res) {
  console.log('entered route /api/employees/delete')
  console.log('req.body: ', req.body)
  const info = await deleteEmployee(req.body.employee_id);
  console.log('info from deleteEmployee:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: {
        message: `Deleted employee id: ${req.body.first_name} ${req.body.last_name}.`
      }
    });
  }
})

module.exports = router;