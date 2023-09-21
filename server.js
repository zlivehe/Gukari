if (process.env.NODE_ENV !== "production") {
   require('dotenv').config();
}

const fs = require("fs");
const cloudinary = require("cloudinary").v2;


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
const  OpenAI = require("openai");

const openai = new OpenAI({
	apiKey: "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",
});

async function main() {
   const completion = await openai.chat.completions.create({
     messages: [{ role: 'user', content: 'give me a story in korean short one' }],
     model: 'gpt-3.5-turbo',
   })
 
   console.log(completion.choices);
 }
 
//  main();
// const openai = new OpenAIApi('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');
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
const AiRoutes = require('./routes/aiRoutes')
//server
const serverPost = require('./routes/server/serverPost')
const serverGet = require('./routes/server/serverGet')
const studentRoutes = require('./routes/studentRoutes')
const apRoutes= require('./routes/apRoutes')
const { promises } = require('dns');

//models 
const models = require('./routes/models/indexRoutes')


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

  //  const users = await User.findById('64bc4922b2aafaad4ddbbb50')
  //  console.log(users)
  //   req.user=users
  //  if(req.user){
  //  }

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
 app.use('/model',models)
 app.use('/ai',AiRoutes)

 //api
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
   
 
//  -------- --------TESTT -------- --------



app.get('/uploadcloud',(req,res)=>{
   res.render('content/videotest/index.ejs')
})
app.post("/audio/upload", async (req, res) => {

  // Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });


  // Filter the file to validate if it meets the required audio extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      // fieldNameSize: 200,
      // fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  }).single("audio");

  // upload to cloudinary
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    // SEND FILE TO CLOUDINARY
    cloudinary.config({
        cloud_name: `dlxqwjiv6`,
        api_key: `497857977683336`,
        api_secret: `_wMbQV7GimlFp9WlLaRVVScwsUE`
    });
    const { path } = req.file; // file becomes available in req at this point

    const fName = req.file.originalname.split(".")[0];
    cloudinary.uploader.upload(
      path,
      {
        resource_type: "raw",
        public_id: `AudioUploads/${fName}`,
      },

      // Send cloudinary response or catch error
      (err, audio) => {
        if (err) return res.send(err);

        fs.unlinkSync(path);
        res.send(audio);
      }
    );
  });
});

app.post("/video/upload", async (req, res) => {
   console.log('piost')
   console.log(req.file)
   console.log(req.files)
  // Get the file name and extension with multer
  const storage = multer.diskStorage({
    filename: (req, file, cb) => {
      const fileExt = file.originalname.split(".").pop();
      const filename = `${new Date().getTime()}.${fileExt}`;
      cb(null, filename);
    },
  });

  // Filter the file to validate if it meets the required video extension
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(
        {
          message: "Unsupported File Format",
        },
        false
      );
    }
  };

  // Set the storage, file filter and file size with multer
  const upload = multer({
    storage,
    limits: {
      fieldNameSize: 2000,
      fileSize: 60 * 1024 * 1024,
    },
    fileFilter,
  }).single("video");

  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    // SEND FILE TO CLOUDINARY
    cloudinary.config({
      cloud_name: `dlxqwjiv6`,
      api_key: `497857977683336`,
      api_secret: `_wMbQV7GimlFp9WlLaRVVScwsUE`
  });
    const { path } = req.file; // file becomes available in req at this point

    const fName = req.file.originalname.split(".")[0];
    cloudinary.uploader.upload(
      path,
      {
        resource_type: "video",
        public_id: `VideoUploads/${fName}`,
        chunk_size: 6000000,
        eager: [
          {
            width: 300,
            height: 300,
            crop: "pad",
            audio_codec: "none",
          },
          {
            width: 160,
            height: 100,
            crop: "crop",
            gravity: "south",
            audio_codec: "none",
          },
        ],
      },

      // Send cloudinary response or catch error
      (err, video) => {
        if (err) return res.send(err);
        console.log(video)

        fs.unlinkSync(path);
        return res.send(video);
      }
    );
  });
});


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
