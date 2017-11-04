const express = require('express');
const models = require('../models');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');

//main routes
router.get('/', function(req, res){
   res.sendFile('home.html', {root: path.join(__dirname, '../public/')});
});

//level routes
router.get('/levels/:id', function(req, res) {
   res.render('level', {levelId: req.params.id});
});


//Authentication
router.post('/login', function(req, res) {
	models.Users.findOne({
		where: 
			{username: req.body.username

			}
	})
	.then(function(dbUser){
		console.log(dbUser);
		bcrypt.compare(req.body.password, dbUser.password, function(err, match) {
		  if(match) {
		   	// Passwords match
				res.json(dbUser);
		  } 
		  else {
		   	// Passwords don't match
		   	res.status(403).json({
		   		error: 'invalid password'
		   	})
		  } 
		});
	});
});

router.post('/account', function(req, res) {
	//need to make sure user is unique 
	console.log(req.body);
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		if(err) throw err;
		models.Users.create({
			username: req.body.username,
			password: hash
		}).then(function(dbUser) {
			res.sendStatus(200);
		});
	});
});

module.exports = router;


