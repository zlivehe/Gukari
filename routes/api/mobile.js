const express = require('express')
const Router = express.Router()
const catchAsync = require('../../views/utilities/catchAsync')
const User = require('../../model/auth/user')
const multer = require('multer');

const Quizcard = require('../../model/home/quizapp/quizcard.js')
const passport = require('passport')
const ObjectId = require('mongoose').Types.ObjectId;
const Vieos = require('../../model/home/upload/videoupload')
const Uploads = require('../../model/home/upload/upload')
const Event = require('../../model/home/reminder/event')
const Reminder = require('../../model/home/reminder/Reminder')
const VideoUpload = require('../../model/home/upload/videoupload')
const ImageUpload = require('../../model/home/upload/upload')

const {storage} = require('../../cloudinary/index')

const upload = multer({storage})

const videostorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd() + '/public/uploads');
    },
    filename: function (req, file, cb) {
      const originalName = encodeURIComponent(path.parse(file.originalname).name).replace(/[^a-zA-Z0-9]/g, '');
      const timestamp = Date.now();
      const extension = path.extname(file.originalname).toLowerCase();
      cb(null, originalName + '_' + timestamp + extension);
    }
  });
  
  const videoupload = multer({
    storage: videostorage,
    
    // limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
    fileFilter: (req, file, callback) => {
      const acceptableExtensions = ['png', 'jpg', 'jpeg', 'mp4', 'mov', 'avi'];
      if (!(acceptableExtensions.some(extension =>
        path.extname(file.originalname).toLowerCase() === `.${extension}`)
      )) {
        return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`));
      }
      callback(null, true);
    }
  });


const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','You must be signed in')
        return res.redirect('/login')
    }
    next()
}
  
  


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

Router.post('/reminder', async(req, res) => {
    const  id  = req.body.token;
    const reminder = await Reminder.find({author: id})
    const event = await Event.find({author: id})
    console.log('senddd')
    res.status(200).json({reminder,event})
})

Router.post('/videos', async(req, res) => {
    const  id  = req.body.token;
    console.log(id)
    const video = await Vieos.find({author: id}).populate('author')
    console.log(video)
    console.log('senddd')
    res.status(200).json({video})
})

Router.post('/uploads', async(req, res) => {
    const  id  = req.body.token;
    const upload = await Uploads.find({author: id})
    console.log('senddd')
    res.status(200).json({upload})
})




async function searchInData(searchTerm) {
    const limit = 10;
  
    // Perform a search in your data models for relevant keywords in the title field.
    const quizcardResults = await QuizCard.find({
        title: { $regex: searchTerm, $options: 'i' }, // Search in title field.
    }).populate('author').limit(limit);
  
    console.log(quizcardResults)
    const videoResults = await VideoUpload.find({
        title: { $regex: searchTerm, $options: 'i' }, // Search in title field.
    }).limit(limit).populate('author');
  
    const imageResults = await ImageUpload.find({
        title: { $regex: searchTerm, $options: 'i' }, // Search in title field.
    }).limit(limit);
  
    // Combine and deduplicate the results from different data sources.
    const combinedResults = deduplicate([...quizcardResults, ...videoResults, ...imageResults]);
  
    // Return an object containing all the search results.
    return { combinedResults, quizcardResults, videoResults, imageResults };
  }
  
  
  function deduplicate(results) {
    // You may need to implement deduplication logic here if there are duplicates.
    // For simplicity, we'll assume there are no duplicates.
    return results;
  }
  
  
  Router.get('/search', async (req, res) => {
      const searchTerm = req.query.term;
  
      // Perform your database queries to find search results.
      const quizcard = await QuizCard.find({ title: searchTerm }).limit(5);
      const video = await VideoUpload.find({ title: searchTerm }).limit(5);
      const image = await ImageUpload.find({ title: searchTerm }).limit(5);
        const { combinedResults, quizcardResults, videoResults, imageResults } = await searchInData(searchTerm);
    console.log(combinedResults)
      // Combine the results and send them as JSON.
      const combinedResults1 = [...quizcard, ...video, ...image];
  
      res.json(combinedResults);
  });




//the post routes to make reminders and quzcar
Router.post('/reminder/:id', upload.single('image'), catchAsync(async (req, res) => {
    console.log(req.file)
    const id = req.params.id;
    console.log(req.body)
    const { title, description, endDate, time,reminder,location,reminderday } = req.body;
    const event = await Event.findById(id);
    //update event
    event.title = title;
    event.description = description;
    event.date = endDate;
    event.endDate = endDate;
    event.location = location;
    event.time = time;
    event.reminder = reminder
    if(req.file){
    event.imageurl = req.file.path;
  }
  console.log(event)
    event.save();
    res.status(200).send({event});
    req.flash('success', 'Event updated successfully');
  
 }));

  
Router.post('/newtask', upload.single('image'), catchAsync(async (req, res) => {
        try {
          const { title, description, image, time, startdate, priority, enddate } = req.body;
          const user = req.user;
          let reminder;
          const imageurl = req.file ? `${req.file.path}` : image;
      
          const tasksCount = await Event.countDocuments(); // Get the count of existing tasks
      
          const newTask = new Event({
            title,
            description: description,
            startDate: startdate,
            endDate: enddate,
            imageurl,
            priority,
            time,
            position: tasksCount + 1, // Set the position to be last in the list
          });
      
          if (user.reminder.length === 0) {
            reminder = new Reminder();
            reminder.Event.push(newTask);
            reminder.user.push(user._id);
            user.reminder.push(reminder._id);
            console.log(reminder);
          } else {
            const reminderId = user.reminder[0];
            reminder = await Reminder.findById(reminderId);
            reminder.Event.push(newTask);
          }
      
          await newTask.save();
          await reminder.save();
          await user.save();
          res.status(200).json({ reminder: newTask, message: 'Successfully created new task!' });
        } catch (e) {
          req.flash('error', e.message);
          res.json(e.message);
        }
}));
      
Router.post('/newtask/:id/delete', catchAsync(async (req, res) => {
        try {
          const { id } = req.params;
          const user = req.user;
          const reminderId = user.reminder[0];
          const reminder = await Reminder.findById(reminderId);
          const task = await Event.findByIdAndDelete(id);
          reminder.Event.pull(task);  
          await reminder.save();
          await user.save();
      
          res.json({ success: true, message: 'Successfully deleted task!' });
        } catch (e) {
          req.flash('error', e.message);
          res.json(e.message);
        }
}));
      


Router.post('/quizcard',  upload.array('image'), isLoggedIn, catchAsync(async (req, res) => {
      console.log(req.body)
      console.log(req.files)
  
      try {
        const { error, value } = quizCardSchema.validate(req.body);
    
        if (error) {
          // Handle validation error
          req.flash('error', error.details[0].message);
          return res.status(400).send(error.details[0].message);
        }
        
        const { title, description,  tags, cards,category } = value;
    if(!cards){
      req.flash('error', 'Cards must be an array');
      return res.status(400).send('Please enter cards');
  
    }
        // Create an array of tag objects with color property
        const tagArray = tags.split(',').map((tag) => ({
          name: tag.trim(),
          color: getRandomColor(),
        }));
    
        // Check if the cards field is an array
        if (!Array.isArray(cards)) {
          req.flash('error', 'Cards must be an array');
          return res.status(400).send('Cards must be an enterd/array');
  
        }
    
        const user = req.user;
    
        // Create an array of card objects
      
        const cardArray = cards.map((card) => {
          // Find the uploaded file based on the card.image field
          const uploadedFile = req.files.find((file) => file.originalname === card.image);
        
          // If no file is uploaded for this card, use the default image filename
          const defaultImageFilename = '';
          const imageUrl = uploadedFile ? `${uploadedFile.path}` : `${defaultImageFilename}`;
        
          // Check if the uploaded file exists and store only the filename
          const imageFilename = uploadedFile ? uploadedFile.filename : '';
        
          return {
            term: card.term,
            position: card.position,
            imageUrl: imageUrl,
            image: imageFilename, // Store only the filename
            definition: card.definition,
          };
        });
        
          console.log(cardArray)
        // Create a new QuizCard object
        let uploadedfile = req.files[0];
        const imageUrl = uploadedfile ? `${uploadedfile.path}` : ``;
  
        const newQuizCard = new QuizCard({
          title,
          description,
          tags: tagArray,
          cards: cardArray,
          category:category,
          author: user._id,
          
          imageUrl: imageUrl,
        });
    
  
    
        user.quizCard.push(newQuizCard);
        await user.save();
    
        // Save the QuizCard to the database
        await newQuizCard.save();
        const id = newQuizCard._id;
    
        res.send({newQuizCard, id});
      } catch (e) {
        req.flash('error', e.message);
        res.status(500).json({ success: false, message: e.message });
      }
}));
Router.post('/quiz/:id/clone',async(req,res)=>{
    const {id} = req.params;
    const user = req.user;
    const quiz = await QuizCard.findById(id);
    let titled = quiz.title + '(1)'
  
    const newQuiz = new QuizCard({
      title: titled ,
      description: quiz.description,
      tags: quiz.tags,
  
      cards: quiz.cards,
      category: quiz.category,
      author: user._id,
      visability: quiz.visability,
      imageUrl: quiz.quiz,
      orginatedfrom: quiz.user
    })
    console.log(newQuiz)
     quiz.clones.push(newQuiz._id);
    quiz.cloned.push(user._id);
  
    user.quizCard.push(newQuiz);
    await newQuiz.save();
    await user.save();
  
    res.redirect(`/home/quiz/${newQuiz._id}`)
  
  })
  Router.post('/quiz/:id/combined',(req,res)=>{
    const {id} = req.params;
    const user = req.user;
    const quiz = QuizCard.findById(id);
    const slectedid = req.body.selected;
  
  })
    



//a video and aimages routes

//Upload Video
Router.post('/videoupload', videoupload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]), catchAsync(async (req, res) => {
    try {
      console.log(req.body);
  
      const { title, description, category, tags,visabi } = req.body;
      const { video, thumbnail } = req.files;
      const user = req.user;
      const newVideo = new VideoUpload({
        tags: tags.split(',').map(tag => tag.trim()),
        title,
        description,
        author: user,
        category,
        visibility:visabi,
        VideoUrl: `/uploads/${video[0].filename}`,
        thumbnail: `/uploads/${thumbnail[0].filename}`
      });
  
      // Save the new video
      await newVideo.save();
      user.VideoUpload.push(newVideo._id);
      await user.save();
      
  
      console.log(user);
      res.send({newVideo});
    } catch (e) {
      req.flash('error', e.message);
      res.json(e.message);
    }
  }));
  
Router.post('/imageupload', upload.single('image'), catchAsync(async (req, res) => {
    try {
     console.log(req.body);
      const user = req.user;
      console.log(user)
  
      const image = await new ImageUpload({
        imageurl: `${req.file.path}`,
        title: req.body.title,
        category: req.body.category,
        author: user._id,
        visability: req.body.visability,
        description: req.body.description,
      });
     
      await image.save();
      user.Uploads.push(image._id);
      await user.save();
  
      res.send({image});
    } catch (e) {
      req.flash('error', e.message);
      res.json(e.message);
    }
}));
  
//the comments route
Router.post('/video/:id/comments', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    console.log(req.body)
    const user = req.user;
    // Find the video by ID
    
    const upload = await VideoUpload.findById(id);
  
    // Create a new comment object
    const newComment = {
      user: req.user._id, // Assuming you have user authentication implemented
      content: comment,
      replies: [],
      likes: [],
      dislikes: [],
      
  
    };
  
    // Add the comment to the video's comments array
    upload.comments.push(newComment);
  
    // Save the updated video
    const uploadedComment = upload.comments[upload.comments.length - 1];
  
    await upload.save();
    res.json({newComment:uploadedComment,user});
  
  
    res.redirect(`/video/${id}`);
}));
Router.post('/video/:id/comments/:commentId/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const {commentId} = req.params;
    const { content } = req.body;
    console.log(req.body)
    const user = req.user;
    const Videoc = await VideoUpload.findById(id);
    const foundcomment = Videoc.comments.find((c) => c._id.toString() === commentId);
    if (!content) {
      return res.status(404).json({ error: 'Comment not found' });
    }
      console.log('foundedcommet' + foundcomment)
    //edit coMMENT
      foundcomment.content = content;
      await foundcomment.save();
      await Videoc.save();
      // Find the video by ID
        res.json({foundcomment,user});
    
      ;
  
    res.redirect(`/video/${id}`);
}));
Router.post('/video/:id/comments/:commentId/delete', catchAsync(async (req, res) => {
    const { id } = req.params;
    const {commentId} = req.params;
    console.log(req.body)
    const user = req.user;
    const Videoc = await VideoUpload.findById(id);
    const foundcomment = Videoc.comments.find((c) => c._id.toString() === commentId);
   
    //delete comment
    Videoc.comments.pull(foundcomment);
    await Videoc.save();
      
        res.json({foundcomment,user});
    
      ;
  
}));
  
Router.post('/home/video/:id/like', async (req, res) => {
    try {
      const videoId = req.params.id;
      const video = await VideoUpload.findById(videoId);
  
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
  
      if (req.user.likedVideos.includes(videoId)) {
        req.user.likedVideos.pull(videoId);
        video.likes.pull({ user: req.user.id });
        await video.save();
        await req.user.save();
        return res.json({ likesCount: video.likes.length - 1, dislikesCount: video.dislikes.length });
      }
  
      if (req.user.dislikedVideos.includes(videoId)) {
        req.user.dislikedVideos.pull(videoId);
        video.dislikes.pull({ user: req.user.id });
        await video.save();
        await req.user.save();
        return res.json({ likesCount: video.likes.length + 1, dislikesCount: video.dislikes.length - 1 });
      }
  
      video.likes.push({ user: req.user.id });
      req.user.likedVideos.push(videoId);
      await video.save();
      await req.user.save();
  
      res.json({ likesCount: video.likes.length, dislikesCount: video.dislikes.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});
  
Router.post('/home/video/:id/dislike', async (req, res) => {
    try {
      const videoId = req.params.id;
      const video = await VideoUpload.findById(videoId);
  
      if (!video) {
        return res.status(404).json({ message: 'Video not found' });
      }
  
      if (req.user.dislikedVideos.includes(videoId)) {
        req.user.dislikedVideos.pull(videoId);
        video.dislikes.pull({ user: req.user.id });
        await video.save();
        await req.user.save();
        return res.json({ likesCount: video.likes.length, dislikesCount: video.dislikes.length - 1 });
      }
  
      if (req.user.likedVideos.includes(videoId)) {
        req.user.likedVideos.pull(videoId);
        video.likes.pull({ user: req.user.id });
        await video.save();
        await req.user.save();
        return res.json({ likesCount: video.likes.length - 1, dislikesCount: video.dislikes.length + 1 });
      }
  
      video.dislikes.push({ user: req.user.id });
      req.user.dislikedVideos.push(videoId);
      await video.save();
      await req.user.save();
  
      res.json({ likesCount: video.likes.length, dislikesCount: video.dislikes.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});
  


module.exports = Router;
