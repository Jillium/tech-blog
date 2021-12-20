const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const routes = require('./controllers/');
const session = require('express-session');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3006;

let sess;
if (process.env.JAWSDB_SC) {
    sess = {
        secret: process.env.JAWSDB_SC,
        cookie: {},
        resave: false,
        saveUninitialized: true,
        store: new SequelizeStore({ db: sequelize })
    }
} else sess = {

    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const hbs = exphbs.create({ helpers });




// middleware for express 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// use routes in controllers fouler 
app.use(require('./controllers'));



// turn on connection to database and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("I'm listening!"));
});