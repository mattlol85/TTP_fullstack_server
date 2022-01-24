const Sequelize = require('sequelize')

const sequelize = new Sequelize ('sequelize_crud', 'postgres', 'Zhuang0426', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        freezeTableName: true
    },
    logging: false
})

async function test() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

test()
module.exports = sequelize

