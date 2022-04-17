const router = require('express').Router();
const { getAllEmployees, getAllDepartments, getAllRolesByDept } = require('../../lib/employees')

router.get('/employees/viewAll', async function(req,res) {
  console.log('entered route /employees/viewAll')
  const info = await getAllEmployees();
  // console.log('info')
  console.log('info from getAllEmployees:', info)
  console.log("info.message.includes('Error:'): ", info.message.includes('Error:'))
  if(info.message.includes('Error:')){
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
  console.log('entered route /employees/departments/all')
  const info = await getAllDepartments();
  // console.log('info')
  console.log('info from getAllDepartments:', info)
  console.log("info.message.includes('Error:'): ", info.message.includes('Error:'))
  if(info.message.includes('Error:')){
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
  console.log('entered route /employees/roles/byDepartment')
  console.log('req.query.id: ', req.query.id)
  const info = await getAllRolesByDept(req.query.id);
  // console.log('info')
  console.log('info from getAllRolesByDept:', info)
  console.log("info.message.includes('Error:'): ", info.message.includes('Error:'))
  if(info.message.includes('Error:')){
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
  console.log('entered route /employees/byDepartment')
  console.log('req.query.id: ', req.query.id)
  // const info = await getAllRolesByDept(req.query.id);
  // // console.log('info')
  // console.log('info from getAllRolesByDept:', info)
  // console.log("info.message.includes('Error:'): ", info.message.includes('Error:'))
  // if(info.message.includes('Error:')){
  //   res.status(500).json({error: info})
  // } else {
  //   console.log("success")
  //   res.json({
  //     message:'success',
  //     data: info.response
  //   });
  // }
})

// TODO: Create add employee route.
router.post('/employees/add', async function(req,res) {
  console.log('entered route /employees/viewAll')
  const info = await getAllEmployees();
  // console.log('info')
  // console.log('info from getAllEmployees:', info)
  // console.log("info.message.includes('Error:'): ", info.message.includes('Error:'))
  // if(info.message.includes('Error:')){
  //   res.status(500).json({error: info})
  // } else {
  //   console.log("success")
  //   res.json({
  //     message:'success',
  //     data: info.response
  //   });
  // }
})

module.exports = router;