const router = require('express').Router()

var userlogin = require('../controller/user/usertoken')
var userRegister = require('../controller/user/userRegcontroller')
var userSurvey = require('../controller/user/userSurveyController')


router.post('/adduser', userRegister.addUser)
router.post('/userlogin', userlogin.userlogin)

router.post('/addSurvey', userSurvey.addSurvey)
router.get('/getSurveyData', userSurvey.getSurveyData)

// router.post

module.exports = router