const sequelize = require ("sequelize")
const db = require('./db')


const Students = db.define('students', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true
    },
    firstName: {
        type: sequelize.STRING,
        allowNull: false,
        ignore_whitespace: true,
        validate: {
            notNull: {
                msg: 'Enter Your First Name'
            }
        }
    },
    lastName: {
        type: sequelize.STRING,
        allowNull: false,
        ignore_whitespace: true,
        validate: {
            notNull: {
                msg: 'Enter Your Last Name'
            }
        }
    },
    email: {
        type: sequelize.STRING,
        validate: {
            notEmpty: {
                msg: 'Enter Your Email'
            },
            isEmail: {
                msg: 'Please Enter A Valid Email'
            }
        }
    },
    gpa: {
        type: sequelize.FLOAT,
        allowNull: false,
        validate: {
            check(gpa) {
                if (gpa < 0 || gpa > 4) {
                    throw new Error ('GPA must be in the range of [0,4].')
                }
            }
        }
    },
    img: {
        type: sequelize.STRING,
        defaultValue: "url.com"
    }
},
{
    timestamps: false,
    initialAutoIncrement: 1
})

module.exports = Students