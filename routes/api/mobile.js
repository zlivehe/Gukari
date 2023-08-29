const express = require('express')
const Router = express.Router()
const catchAsync = require('../../views/utilities/catchAsync')
const User = require('../../model/auth/user')
const Quizcard = require('../../model/home/quizapp/quizcard.js')
const passport = require('passport')
const ObjectId = require('mongoose').Types.ObjectId;
const Event = require('../../model/home/reminder/event')
Router.post('/signup',catchAsync(async(req,res)=>{
    try{
        console.log(req.body.user)
        console.log(req.body.email)
        
    const {email, username, password} = req.body;
    const user = new User({email,username})
    const registerdUser = await User.register(user,password);
     user.save()
        token = user._id
    res.status(200).json({user,token})
    

    }catch(e){
    req.flash('error',e.message)
    console.log(e.message)
     res.status(400).json({message:e.message})
    }


}))
Router.post('/userid',catchAsync(async(req,res)=>{
    try{
        console.log(req.body.token)
        const  id  = req.body.token;
        const user = await User.findById(id)
        console.log(id)
        console.log(user)
    res.status(200).send({user})
    }catch(e){
    req.flash('error',e.message)
    console.log(e.message)
     res.status(400).json({message:e.message})
    }

}))


Router.post('/mobilelogin',passport.authenticate('local',
 {failureFlash:true, failureRedirect: '/login'}),(req,res)=>{
      res.status(200).json({user: req.user, message: 'success',token: req.user._id})
        console.log('in')
        
    
})
Router.post('/reminder/event',catchAsync(async(req,res)=>{
    const token = req.body.token
    console.log(token)

}))

Router.post('/project', async(req, res) => {
    const  id  = req.body.token;
    const user = await User.findById(id)
    const quizCardIds = user.quizCard.map(id => ObjectId(id))
    const quizcard = await Quizcard.find({ _id: { $in: quizCardIds } }).populate('author')
    console.log(quizcard)
    res.status(200).json({quizcard})
})

module.exports = Router;
