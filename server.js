const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
const routes = require('./controllers/');
const session = require('express-session');
const sequelize = require('./config/connection');
// const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3006;



// middleware for express 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// use routes in controllers fouler 
app.use(require('./controllers'));



// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("I'm listening!"));
});