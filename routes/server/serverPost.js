const express = require('express')
const Router = express.Router()

Router.post('/server',(req,res)=>{
    res.render('content/server/server.ejs')
})
module.exports = Router
