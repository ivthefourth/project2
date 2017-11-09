const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const handlebars = require('express-handlebars');
const db = require('./models');

const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(routes);

// db.sequelize.sync({force: true}) 
	db.sequelize.sync()
	.then(function() {
		app.listen(PORT, () => {
   		console.log('serving yo');
		// app.listen(PORT, function() {
	 //  	console.log("App listening on PORT " + PORT);
	});
});