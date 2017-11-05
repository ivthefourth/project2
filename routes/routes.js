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
		console.log(dbUser);
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
		   	res.status(403).json({
		   		error: 'invalid password'
		   	})
			} 
		});
	});
});

router.post('/account', function(req, res) {

	models.Users.create({
		username: req.body.username,
		password: req.body.password
	}).then(function(dbUser) {
		console.log(`User info added: ${dbUser}`);
	});
// });


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
   res.render('level', {levelId: req.params.id});
});


// delete user account
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


