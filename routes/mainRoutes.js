const express = require('express')
const Router = express.Router()
const VideoUpload = require('../model/home/upload/videoupload')
const QuizCard = require('../model/home/quizapp/quizcard')
const ImageUpload = require('../model/home/upload/upload')

Router.get('/subject',async(req,res)=>{
    const card = await QuizCard.find({}).populate('author')
    const video = await VideoUpload.find({}).populate('author')
    const image = await ImageUpload.find({}).populate('author')
    
    res.render('content/page/subject.ejs', {card,video,image})
})
Router.get('/course',(req,res)=>{
    res.render('content/page/courses.ejs')

})
module.exports = Router
