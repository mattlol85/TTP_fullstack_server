//Connect Local databse through Sequelize with Express
//API Router of Campuses
const router = require('express').Router()
const {Compuses, Students} = require('./database/index')

router.route('/')
// Insert a new Student
.post(async(req, res) => {
    console.log(req.body)
    
    try {
        const newStudent = await Students.create({
        id: req.body.id,
        campusId: req.body.campusId, //(Foreign Key) Student should has at most one campuseId
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gpa: req.body.gpa,
        img: req.body.img
    })
        res.json(newStudent.rows)
    }catch(err) {
        if(err.message === "Validation error") {
            res.send("id already existed!")
        }else{
            res.send(err.message)
        }
    }
})


