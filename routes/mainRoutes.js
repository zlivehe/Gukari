const express = require('express')
const Router = express.Router()
Router.get('/subject',(req,res)=>{
    res.render('content/page/subject.ejs')
})
Router.get('/course',(req,res)=>{
    res.render('content/page/courses.ejs')

})
module.exports = Router
