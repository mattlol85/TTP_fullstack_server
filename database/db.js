const {Sequelize} = require('sequelize')

const sequelize = new Sequelize ('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        freezeTableName: true
    },
    logging: false
})

module.exports = sequelize

