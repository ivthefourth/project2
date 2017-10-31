const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(routes);

app.listen(PORT, () => {
   console.log('serving yo');
});
