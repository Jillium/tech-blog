// calls in model and datatypes 
const { Model, DataTypes } = require('sequelize');

//create User model
class User extends Model { }

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