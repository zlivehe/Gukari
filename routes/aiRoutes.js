const express = require('express')
const Router = express.Router()
const multer = require('multer');
const catchAsync = require('../views/utilities/catchAsync')

Router.get('/chatbox',(req,res)=>{
    res.render('content/home/create/quiz/ai.ejs')
})
module.exports = Router
