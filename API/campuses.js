//Connect Local databse through Sequelize with Express
//API Router of Campuses
const router = require('express').Router()
const {Campuses, Students} = require('../database/index')

//Listen on http://localhost:3000/API/campuses
router.route('/')
// Insert a new Campus
.post(async(req, res) => {
    console.log(req.body)
    
    try {
        const newCampus = await Campuses.create({
        id: req.body.id,
        name: req.body.name, 
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        description: req.body.description,
        img: req.body.img
    })
        res.json(newCampus.rows)
    }catch(err) {
        if(err.message === "Validation error") {
            res.send("id already existed!")
        }else{
            res.send(err.message)
        }
    }
})

//Get all campuses from database
.get(async (req, res) => {
    try{
        const campuses = await Campuses.findAll()
        if (campuses.length === 0) {
            res.send("There are no campuses registered in the the database")
        }else{
            res.send(campuses)
        }

    }catch(err) {
        res.send(err.message)
    }
})

//Relocate the api link
//Listen on localhost:3000/API/campuses/{id}
router.route('/id')
// Getting a single campuse
.get(async(req, res) => {
    try {
        const targetCampus = await Campuses.findByPk(req.params.id)
        // All students who has the targetCampus.id will be considered to dislay on the page
        const students = await Students.findAll({where: {campusId: targetCampus.id}})
        res.status(200).json({
            campus: targetCampus,
            student: students
        })
    }catch(err){
        res.send(err.message)
    }
})

//To delete the target campus
.delete(async(req, res)=> {
    try{
        const targetCampus = await Campuses.findByPk(req.params.id)
        //remove the campus
        await targetCampus.destory()
    }catch(err){
        res.send(err.message)
    }
})

//To update the campus info
.put(async(req, res) => {
    console.log("Update target: " + req.params.id)
    const input = req.body
    const target = await Campuses.findByPk(req.params.id)
    for (let key in target) {
        console.log(key)
        target.update({[key]:target[key]})
    }
})

module.exports = router
