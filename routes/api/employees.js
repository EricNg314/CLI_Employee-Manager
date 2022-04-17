const router = require('express').Router();
const { getAllEmployees } = require('../../lib/employees')

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

module.exports = router;