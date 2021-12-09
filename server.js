const path = require('path');
const express = require('express');
// const routes = require('./controllers/');


const app = express();
const PORT = process.env.PORT || 3002;

// const sequelize = require('./config/connection');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use(require('./controllers'));

app.listen(PORT, () => console.log('Now listening'));