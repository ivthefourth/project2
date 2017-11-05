const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/levels/:id', function(req, res) {
   res.render('level', {levelId: req.params.id});
});

router.post('/login', function(req, res) {
	models.Users.findOne({
		where: 
			{username: req.body.username
			}
		}).then(function(dbUser){
			res.json(dbUser);
			});
});

router.post('/account', function(req, res) {
	models.Users.create({
		username: req.body.username,
		password: req.body.password
	}).then(function(dbUser) {
		console.log(`User info added: ${dbUser}`);
	});
});

router.delete('/delete/:username', function(req, res) {
	models.Users.destroy({
		where: {
			username: req.params.username
		}
	}).then(function(dbUser) {
		console.log(`${dbUser.username} deleted from database`);
	})
});

module.exports = router;

