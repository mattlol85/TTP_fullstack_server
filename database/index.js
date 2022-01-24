//Build the relationships betwwen Campuses and Students
const Sequelize = require('sequelize')
const Students = require('./students')
const Campuses = require('./campuses')
const database = require('./db')


Campuses.hasMany(Students) // 1:M
Students.belongsTo(Campuses) // 1:M 

module.exports = {
    database,
    Students,
    Campuses
}