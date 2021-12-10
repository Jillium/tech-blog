// calls in model and datatypes 
const { Model, DataTypes } = require('sequelize');
// needed to connect to mysql database
const sequelize = require('../config/connection');
// require bcrypt for password safety
const bcrypt = require('bcrypt');

//create User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns
User.init(
    {
        //table column definitions
        id: {
            // makes it a number
            type: DataTypes.INTEGER,
            // doesn't allow null
            allowNull: false,
            // sets the primary key
            primaryKey: true,
            //auto increments the id
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // make sure email is unique 
            unique: true,
            // validate that it's an email
            validate: {
                isEmail: true
            }

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // sets a min length for the password
                len: [4]
            }
        }


    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        //table configuration options

        // pass in imported sequelize connection
        sequelize,
        // don't automatically create timestampe fields
        timestamps: false,
        // don't pluralize the name of the database
        freezeTableName: true,
        //use underscores instead of camel-casing
        underscored: true,
        //make model name stay lowercase
        modelName: 'user'
    }
);

// exports our user model 
module.exports = User;