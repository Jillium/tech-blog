const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3006;



// middleware for express 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// use routes in controllers fouler 
app.use(require('./controllers'));

// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("I'm listening!"));
});