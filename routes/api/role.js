const router = require('express').Router();
const { 
  getAllRolesByDept,
  addRole,
  getAllRoles,
  deleteRole } = require('../../lib/role');

router.get('/roles/viewAll', async function(req,res) {
  console.log('entered route /api/roles/viewAll')
  const info = await getAllRoles();
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

router.post('/roles/add', async function(req,res) {
  console.log('entered route /api/roles/add')
  console.log('req.body: ', req.body)
  const info = await addRole(req.body);
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

router.get('/roles/byDepartment', async function(req,res) {
  console.log('entered route /api/roles/byDepartment')
  console.log('req.query.id: ', req.query.id)
  const info = await getAllRolesByDept(req.query.id);
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

router.delete('/roles/delete', async function(req,res) {
  console.log('entered route /api/roles/delete')
  console.log('req.body: ', req.body)
  const info = await deleteRole(req.body.role_id);
  console.log('info from deleteRole:', info)
  if(info.message.includes('Error:')){
    console.error("Error info: ", info)
    res.status(500).json({error: info})
  } else {
    console.log("success")
    res.json({
      message:'success',
      data: {
        message: `Deleted role: ${req.body.title} from ${req.body.department_name}.`
      }
    });
  }
})


module.exports = router;