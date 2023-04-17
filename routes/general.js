const express = require('express');
const router = express.Router();
const genControler =  require('../controler/general');

router.get('/', genControler.getGen);

router.post('/process', genControler.Process);

module.exports = router;
