const express = require('express')
const Router = express.Router()
const catchAsync = require('../views/utilities/catchAsync')
const User = require('../model/auth/user')
const passport = require('passport')
const {login,getDistrictUrls } = require('studentvue.js')


Router.get('/lang',(req,res) =>{

    res.render('content/home/blog/course/ap/english.ejs')
})
Router.get('/chemistry',(req,res) =>{

    res.render('content/home/course/ap/chemistry.ejs')
})



module.exports = Router
