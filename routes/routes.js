const express = require('express');
const models = require('../models');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'this game is not a parody';


// Define relationships in sequelize


//Authentication
router.post('/login', function(req, res) {
	models.Users.findOne({
		where: 
			{username: req.body.username

			}
	})
	.then(function(dbUser){
		bcrypt.compare(req.body.password, dbUser.password, function(err, match) {
			if(match) {
				const payload = {
					user: dbUser.username 
				};
				var token = jwt.sign(payload, secret);

				res.json({
					token: token
				});
			} 
			else {
		   	res.json({
		   		error: 'invalid password'
		   	})
			} 
		});
	});
});

router.post('/account', function(req, res) {
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		if(err) res.sendStatus(500);
		models.Users.create({
			username: req.body.username,
			password: hash
		})
		.then(function(dbUser) {
			res.sendStatus(200);
		})
		.catch(function(err){
			if(err.name == 'SequelizeUniqueConstraintError'){
				res.json({
					error: 'username taken',
				});
			}
			else{
				res.sendStatus(500);
			}
		});
	});
});

//authentication middleware 
router.use(function(req, res, next) {
	var token = req.body.token || req.query.token;
	if (token) {
		jwt.verify(token, secret, function(err, decoded) {      
			if (err) {
				req.auth = null;  
			} 
			else {
				req.auth = decoded; 
			}
		});
	} 
	else {
		req.auth = null;
	}   
	next();
});


//main routes
router.get('/', function(req, res){
   res.sendFile('home.html', {root: path.join(__dirname, '../public/')});
});


//level routes
router.get('/levels/:id', function(req, res) {
	if(req.auth){
		//check if user has unlocked level before sending res
   	res.render('level', {levelId: req.params.id});
	}
	else{
		res.redirect('/');
	}
});


//game API routes
router.post('/add-death', function(req, res) {
	console.log(req.auth);
	if(req.auth){
		models.Users.increment('deathCount', { 
			where: { username: req.auth.user}
		})
		.then(success => res.json({success}))
		.catch(err => res.sendStatus(500));
	}
	else{
		res.json({error: 'not authenticated'});
	}
})


// delete user account
router.delete('/delete/:username', function(req, res) {
	models.Users.destroy({
		where: {
			username: req.params.username
		}
	}).then(success => res.json(`${dbUser.username} deleted from database`))
	   .catch(err => res.sendStatus(500));
});

module.exports = router;


