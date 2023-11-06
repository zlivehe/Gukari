const express = require('express')
const Router = express.Router()
const VideoUpload = require('../model/home/upload/videoupload')
const QuizCard = require('../model/home/quizapp/quizcard')
const ImageUpload = require('../model/home/upload/upload')

Router.get('/',async(req,res)=>{
    const card = await QuizCard.find({}).populate('author')
    const video = await VideoUpload.find({}).populate('author')
    const image = await ImageUpload.find({}).populate('author')
  
      res.render('content/home/home.ejs',{card,video,image})
})

Router.get('/api/videos', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Pseudo-code for fetching videos with pagination
    // You would replace this with your actual database query
    video.findAndCountAll({ limit: limit, offset: offset })
        .then(result => {
            res.json({
                videos: result.rows,
                total: result.count,
                page: page,
                totalPages: Math.ceil(result.count / limit)
            });
        })
        .catch(error => {
            // Handle error
            res.status(500).json({ error: 'An error occurred' });
        });
});


Router.get('/subject',async(req,res)=>{
    const card = await QuizCard.find({}).populate('author')
    const video = await VideoUpload.find({}).populate('author')
    const image = await ImageUpload.find({}).populate('author')
    
    res.render('content/page/subject.ejs', {card,video,image})
})
Router.get('/course',(req,res)=>{
    res.render('content/page/courses.ejs')

})
Router.get('/privacy',(req,res)=>{
    res.render('content/page/auth/policy.ejs')

})
Router.get('/cookies',(req,res)=>{
    res.render('content/page/auth/cookies.ejs')

})
Router.get('/terms',(req,res)=>{
    res.render('content/page/auth/terms.ejs')

})
module.exports = Router
