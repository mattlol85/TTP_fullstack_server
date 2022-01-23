//Build the relationships betwwen Campuses and Students
const Sequelize = require('sequelize')
const Students = require('./students')
const Campuses = require('./campuses')
const database = require('./database')

Campuses.hasMany(Students) // M:M
Students.belongsTo(Campuses) // 1:M 

module.exports = {
    database,
    Students,
    Campuses
}