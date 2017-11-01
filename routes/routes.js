const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/levels/:id', function(req, res) {
   res.render('level', {levelId: req.params.id});
})

module.exports = router;

