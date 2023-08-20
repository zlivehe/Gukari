const express = require('express')
const Router = express.Router()
Router.get('/',(req,res)=>{
    const name = 'sam'
    res.render('content/home/server.ejs',{name: name})

})


module.exports = Router
