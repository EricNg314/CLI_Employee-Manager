const express = require('express');
const router = express.Router();

router.use(require('./employees'));
router.use(require('./department'));
router.use(require('./role'));

module.exports = router;