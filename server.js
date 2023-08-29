if (process.env.NODE_ENV !== "production") {
   require('dotenv').config();
}
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const methodOveride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const path = require('path')
const LocalStrategy = require('passport-local')
const User = require('./model/auth/user')
const multer = require('multer');
const bodyParser = require('body-parser')
const ExpressError = require('./views/utilities/ExpressError')
const catchAsync = require('./views/utilities/catchAsync')
const axios = require('axios')
const { Parser } = require('m3u8-parser');
const playlistUrl = 'https://iptv-org.github.io/iptv/index.m3u';
const QuizCard = require('./model/home/quizapp/quizcard')
const autopopulate = require('mongoose-autopopulate');
const Videos = require('./model/home/upload/videoupload');
const cors = require('cors');

app.use(cors());
// const translate = require('@iamtraction/google-translate');

// translate('Tu es incroyable!', { to: 'fr' }).then(res => {
//    console.log(res.text); // OUTPUT: You are amazing!
//  }).catch(err => {
//    console.error(err);
//  });
// const synergy = require('./routes/')
const authRoutes = require('./routes/user');
const homeRoutes = require('./routes/homeRoutes')
const postRoutes = require('./routes/postRoutes')
const mainRoutes = require('./routes/mainRoutes')
const videoRoutes = require('./routes/videoRoutes')
const boardRoutes = require('./routes/workSpace')
const extensionRoutes = require('./routes/api/extensionRoutes')
const mobileRoutes = require('./routes/api/mobile')
//server
const serverPost = require('./routes/server/serverPost')
const serverGet = require('./routes/server/serverGet')
const studentRoutes = require('./routes/studentRoutes')
const apRoutes= require('./routes/apRoutes')
const { promises } = require('dns');


const sessionConfig = {
   secret :'thisshouldbebetter',
   resave:false,
   saveUninitialized:true,
   cookie:{
   httpOnly:true,
   expires: Date.now() + 100 * 60 * 60 * 24 * 7,
   maxAge: 100 * 60 * 60 * 24 * 7
   }
}


// dbUrl = 'mongodb+srv://bdi:dqrJ6h81tQh2OjLt@cluster0.5lauo.mongodb.net/test'
dbUrl = 'mongodb+srv://zlivhe:pVGMDmaGmxRCenYU@gukari.w3j3o1v.mongodb.net/'

mongoose.connect(dbUrl, 
{useNewUrlParser: true,
useUnifiedTopology: true})

.then(()=>{
   console.log('open')
})
.catch(err =>{
   console.log("Oh no")
   console.log(err)
});
app.set('views engine','ejs')
app.set('views', path.join(__dirname, 'views')); 

app.engine('ejs',ejsMate)
app.use(methodOveride('_method'))
app.use(express.static('layout'))
app.use(express.static('js'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session(sessionConfig))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));   
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(async(req, res, next) => {

   const users = await User.findById('647b5c354937d00da81c3038')
   console.log(users)
    req.user=users
    res.locals.currentUser = req.user;

   res.locals.success = req.flash('success');
   res.locals.warning = req.flash('warning')
   res.locals.error = req.flash('error');
   
   next();
})

 app.use ('/', authRoutes)
 app.use ('/home', homeRoutes)
 app.use ('/', mainRoutes)
 app.use ('/ap', apRoutes)
 app.use ('/student', studentRoutes)
 app.use ('/', postRoutes)
 app.use ('/', videoRoutes)
 app.use ('/server', serverPost)
 app.use ('/server', serverGet)
 app.use ('/', boardRoutes)
 app.use('/ext', extensionRoutes)
 app.use('/api',mobileRoutes)
 



 app.get('/',(req,res)=>{
    res.render('content/page/index.ejs')
 })

 //extention
 app.get('/api/video', async(req,res)=>{
   const video = await Videos.find({})
   console.log(video)
   res.json(video)
} )
app.get('/api/card', async(req,res)=>{ 
   const card = await QuizCard.find({})
   console.log(card)
   res.json(card)
   } ) 
   app.post('/api/card', async(req,res)=>{ 
      const token = req.body.token  
            console.log('dd')
      console.log(token)
      const user = await User.findById(token)
      console.log(user)
      // const card = await QuizCard.find({})
      // console.log(card)
      // res.json(card)
      } ) 
   
 
 // 404 page not found route
 app.all('*', (req,res,next)=>{
    next(new ExpressError('Page Not Found', 404))
 })
 // error hadling 
 app.use((err, req, res, next) =>{
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error.ejs', { err })
 })
 //server
 app.listen(3005, () => {
    console.log('Serving on port 3005')
 })
 