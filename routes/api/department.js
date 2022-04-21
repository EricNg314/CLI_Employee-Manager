const router = require('express').Router();
const { 
  getAllDepartments,
  getBudgetByDept,
  addDepartment,
  deleteDepartment } = require('../../lib/department');

router.get('/departments/all', async function(req,res) {
  console.log('entered route /api/departments/all')
  const info = await getAllDepartments();
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

router.get('/departments/totalBudget', async function(req,res) {
  console.log('entered route /api/departments/totalBudget')
  console.log('req.query.id: ', req.query.id)
  const info = await getBudgetByDept(req.query.id);
  console.log('info from getBudgetByDept:', info)
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


router.post('/departments/add', async function(req,res) {
  console.log('entered route /api/department/add')
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
        message: `Added department ${req.body.department_name}.`
      }
    });
  }
})

router.delete('/departments/delete', async function(req,res) {
  console.log('entered route /api/department/delete')
  console.log('req.body: ', req.body)
  const info = await deleteDepartment(req.body.department_id);
  console.log('info from deleteDepartment:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: {
        message: `Deleted department: ${req.body.department_name}.`
      }
    });
  }
})

module.exports = router;