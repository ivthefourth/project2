const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/levels/:id', function(req, res) {
   console.log('hey');
})

module.exports = router;

