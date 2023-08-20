const express = require('express')
const Router = express.Router()
const catchAsync = require('../views/utilities/catchAsync')
const User = require('../model/auth/user')
const passport = require('passport')
const {login,getDistrictUrls } = require('studentvue.js')


Router.get('/ap/lang',(req,res) =>{

    res.render('content/home/course/ap/aplang.ejs')
})


module.exports = Router
