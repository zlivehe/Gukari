const express = require('express')
const Router = express.Router()

Router.get('/project',(req,res)=>{
    res.render('models/home/project/index.ejs')

})

Router.get('/',(req,res) =>{
    res.render('models/project/index.ejs')
})
Router.get('/stats',(req,res)=>{
    res.render('models/home/project/stats.ejs')
})
module.exports = Router;    