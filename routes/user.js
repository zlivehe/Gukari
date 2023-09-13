const express = require('express')
const Router = express.Router()
const catchAsync = require('../views/utilities/catchAsync')
const User = require('../model/auth/user')
const passport = require('passport')
const path = require('path')
const {login,getDistrictUrls } = require('studentvue.js')
const multer = require('multer');
// require('../model/auth/oauth')
// const GoogleStrats = require('passport-google-oauth2').Strategy

const {storage} = require('../cloudinary/index')

const upload = multer({storage})



Router.get('/auth/google',
passport.authenticate('google',{ scope: ['email','profile'] }),
);
Router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/home')
})
Router.post('/auth/google/token', async (req, res) => {
  try {
      const token = req.body.token;
      const client = new GoogleStrats(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();

      // Check if the user exists in the database
      let user = await User.findOne({ googleId: payload.sub });
      if (!user) {
          // If user doesn't exist, create a new user
          user = new User({
              email: payload.email,
              username: payload.name,
              photourl: payload.picture,
              googleId: payload.sub
          });
          await user.save();
      }
      // Send back user info if needed, or just a success status
      res.json(user);
  } catch (err) {
      res.status(400).send({ error: 'Invalid token' });
  }
});
Router.get('/signup',(req,res)=>{
    currentUser = req.user
    
    if(currentUser){
        res.redirect('/setup')
    } else{
    res.render('content/page/auth/signup.ejs')
    }
})
Router.get('/login',(req,res)=>{

    res.render('content/page/auth/login.ejs')
    
})
Router.get('/welcom',(req,res)=>{
    res.render('content/page/auth/welcom.ejs')
})


Router.post('/signup',catchAsync(async(req,res)=>{
  

    try{
      const tailwindColors = [
        'blue', 'indigo', 'purple', 'pink', 'red',
        'orange', 'yellow', 'green', 'teal', 'cyan','emerald','lime','amber','fuchsia','rose','violet','indigo','sky','mint','orange','gold','bronze','brown','gray','blueGray',
      ];
      
      function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
      }
        console.log(req.body.user)
    const {email, username, password} = req.body;
    const user = new User({email,username})
    const registerdUser = await User.register(user,password);
     user.Istudent = false;

     const randomColorIndex = getRandomIndex(tailwindColors.length);
    const randomColor = tailwindColors[randomColorIndex];
      console.log(randomColor)
    user.profilecolor = randomColor;
    user.save()

    res.redirect('/setup')

  console.log(req.user)

    }catch(e){
    console.log(e.message)
     res.redirect('/signup')
    }

}))
Router.get('/setup',(req,res)=>{
  if(!req.user){
      res.redirect('/login')
  }
    const currentUser = req.user
    res.render('content/home/Account/setup.ejs',{currentUser})
 
})
Router.post('/setup', upload.single('profileImage'),catchAsync(async(req,res)=>{
   const {surname,profileImage,about} = req.body
   const photoset = req.file.path !== undefined ? req.file.path : ''
    const currentUser = req.user
    currentUser.surname = surname
    currentUser.category = about
    currentUser.save()
    currentUser.photourl = photoset
    currentUser.save()
    console.log(currentUser)
    res.redirect('/home')
   

}))

Router.post('/synergy', catchAsync(async (req, res) => {
    const DISTRICT_URL = req.body.distric;
    const USERNAME = req.body.username;
    const PASSWORD = req.body.password;
    console.log(req.body)
  
    try {
      let client = await login(DISTRICT_URL, USERNAME, PASSWORD);
      let student = await client.getStudentInfo().then((value) => JSON.parse(value));
      console.log(student);
  
      const { username, password } = req.body;
      const email = student.email;
      const existingUser = await User.findOne({ username });
      console.log(existingUser)
      if (existingUser) {
        try {
          passport.authenticate('local', (err, user, info) => {
            user = existingUser
            if (err) {
              console.error(err);
              req.flash('error', 'Failed to authenticate');
              res.redirect('/synergy');
            } else if (!user) {
              console.error('Invalid credentials');
              req.flash('error', 'Invalid credentials');
              res.redirect('/synergy');
            } else {
              req.login(user, (err) => {
                if (err) {
                  console.error(err);
                  req.flash('error', 'Failed to login');
                  res.redirect('/synergy');
                } else {
                  console.log('User logged in:', user);
                  res.redirect('/home');
                }
              });
            }
          })(req, res);
        } catch (e) {
          req.flash('error', e.message);
          console.error(eauth.message);
          res.redirect('/synergy');
        }
      }
       else {
        try {
          const newUser = new User({ email, username });
          const registeredUser = await User.register(newUser, password);
          console.log('New user registered:', registeredUser);
          req.login(registeredUser, (err) => {
            if (err) {
              console.error(err);
              req.flash('error', 'Failsed to lossgin');
              res.redirect('/synergy');
            } else {
                registeredUser.Istudent = true;
                registeredUser.districUrl = DISTRICT_URL;
                registeredUser.password = PASSWORD
                registeredUser.save();
              console.log('User logged in:', registeredUser);
              res.redirect('/home');
            }
          });
        } catch (e) {
          req.flash('error', e.message);
          console.error(e.message);
          res.redirect('/synergy');
        }
      }
    } catch (error) {
      console.error(error);
      res.redirect('/synergy');
    }
  }));

Router.get('/synergy',(req,res)=>{
    res.render('content/page/auth/synergy.ejs')

})

Router.post('/login',passport.authenticate('local',
 {failureFlash:true, failureRedirect: '/login'}),(req,res)=>{

        const redirentUrl = req.session.returnTo || '/home';
        res.redirect(redirentUrl)
        console.log('in')
    
})
Router.post('/mobilelogin',passport.authenticate('local',
 {failureFlash:true, failureRedirect: '/login'}),(req,res)=>{

      res.status(200).json({user: req.user, message: 'success',token: req.user._id})

        console.log('in')
    
})


Router.post('/extlogin',passport.authenticate('local',
 {failureFlash:true, failureRedirect: '/login'}),(req,res)=>{

        const redirentUrl = req.session.returnTo || '/home';
      res.status(200).json({user: req.user})
        console.log('in')
    
})
Router.get('/logout',(req,res)=>{
    req.user = null;
    req.flash('success','successfully loged out')
    res.redirect('/login')
})

module.exports = Router
