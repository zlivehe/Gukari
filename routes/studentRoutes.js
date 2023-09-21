const express = require('express')
const Router = express.Router()
const catchAsync = require('../views/utilities/catchAsync')
const User = require('../model/auth/user')
const passport = require('passport')
const {login,getDistrictUrls } = require('studentvue.js')

const mp1 = 6;
Router.get('/schedule',async(req,res)=>{
    const DISTRICT_URL = 'https://md-mcps-psv.edupoint.com/';
    const USERNAME = '206840';
    const PASSWORD = 'Wereiflivehe123456';
    let client = await login(DISTRICT_URL, USERNAME,PASSWORD );
let results = await Promise.all([
    client.getStudentInfo().then((value) => JSON.parse(value).StudentInfo),
    client.getGradebook().then((value) => JSON.parse(value).Gradebook.Courses.Course),

])
let student = results[0];
let totalresult = null
let courses = results[1]
for(let i = 0; i < courses.length; i++){
    const course = courses[i]
    console.log(course)

}

res.render('content/student/schedule.ejs',{student, courses})
})
Router.get('/grades',async(req,res)=>{
    // const DISTRICT_URL = req.user.districUrl;
    // const USERNAME = req.user.username;
    // const PASSWORD = req.user.password;
    const DISTRICT_URL = 'https://md-mcps-psv.edupoint.com/';
    const USERNAME = '206840';
    const PASSWORD = 'Wereiflivehe123456';
let client = await login(DISTRICT_URL, USERNAME,PASSWORD );

let results = await Promise.all([
    client.getStudentInfo().then((value) => JSON.parse(value).StudentInfo),
    client.getGradebook().then((value) => JSON.parse(value).Gradebook.Courses.Course),


])

console.log(results)

let ns = 'yes'

let student =  results[0];

const firstpirod =results[1][0].Marks.Mark.Assignments.Assignment
let firstclass =results[1][0]
console.log(firstpirod)

const secondpirod =results[1][1].Marks.Mark.Assignments.Assignment
let secondclass =results[1][1]

const thirdpirod =results[1][2].Marks.Mark.Assignments.Assignment
let thirdclass =results[1][2]

const forthpiroid =results[1][3].Marks.Mark.Assignments.Assignment
let forthclass =results[1][3]

const fifthpiroid =results[1][4].Marks.Mark.Assignments.Assignment
let fifthclass =results[1][4]

const sixthpiroid =results[1][5].Marks.Mark.Assignments.Assignment
let sixthclass =results[1][5]

const seventhpiroid =results[1][6].Marks.Mark.Assignments.Assignment
let seventhclass =results[1][6]
res.render('content/student/grades.ejs',{student,firstclass, ns,firstpirod, student, secondpirod,secondclass,thirdpirod,thirdclass, forthpiroid, forthclass, fifthpiroid, fifthclass, sixthpiroid, sixthclass, seventhpiroid, seventhclass })

 

})
Router.get('/attendance',(req,res)=>{
    res.render('content/student/attendance.ejs')

})
Router.get('/calender',(req,res)=>{
    res.render('content/student/calender.ejs')

})


module.exports = Router
