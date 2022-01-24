//Connect Local databse through Sequelize with Express
//API Router of Students
const router = require('express').Router()
const {Campuses, Students} = require('../database/index')

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
        res.json(newStudent)
    }catch(err) {
        if(err.message === "Validation error") {
            res.send("id already existed!")
        }else{
            res.send(err.message)
        }
    }
})

//Get all students from database
.get(async (req, res) => {
    try{
        const students = await Students.findAll()
        if (students.length === 0) {
            res.send("There are no campuses registered in the the database")
        }else{
            res.send(students)
        }

    }catch(err) {
        res.send(err.message)
    }
})

//listen on localhost:3000/API/students/{id}
router.route('/:id')
// Getting a single student
.get(async(req, res) => {
    try {
        const targetStudent = await Students.findByPk(req.params.id)
        const campus = await Campuses.findOne({where: {id: targetStudent.campusId}})
        res.status(200).json({
            student: targetStudent,
            campus: campus         
        })
    }catch(err){
        res.send(err.message)
    }
})

//To delete the target campus
.delete(async(req, res)=> {
    try{
        const targetStudent = await Students.findByPk(req.params.id)
        //remove the campus
        await targetStudent.destory()
    }catch(err){
        res.send(err.message)
    }
})

//To update the campus info
.put(async(req, res) => {
    console.log("Update target: " + req.params.id)
    const input = req.body
    const target = await Students.findByPk(req.params.id)
    for (let key in target) {
        console.log(key)
        target.update({[key]:target[key]})
    }
})

module.exports = router