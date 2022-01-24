const sequelize = require ("sequelize")
const db = require('./db')

//Campuses Table (Model)
const Campuses = db.define('campuses', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false,
        //If the validation fails, no SQL query will be sent to the database at all
        validate: {
            notNull: {
                msg: 'Enter Campus Name'
            }
        }
    },
    address: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter The Address'
            }
        }
    },
    city: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter The City'
            }
        }
    },
    state: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Enter The State'
            }
        }
    },
    zip: {
        type: sequelize.INTEGER,
        allowNull: false,
        validate: {
            //Check zip
            check(zip) {
                if (!(/^\d{5}$/.test(zip))) {
                    throw new Error('Invalid Zipcode!!!')
                }
            }
        }
    },
    description: {
        type: sequelize.TEXT
    }, 
    img: {
        type: sequelize.STRING,
        defaultValue:"url.com"
    },
},
{
    //This means that direct SQL queries will not cause those strributes to be updated automatically
    timestamps: false
})

module.exports = Campuses