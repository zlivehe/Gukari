const  express  = require('express');

const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const Router = express.Router()
const QuizCard = require('../model/home/quizapp/quizcard')
const multer = require('multer');
const catchAsync = require('../views/utilities/catchAsync')
const {quizCardSchema} = require('../views/utilities/joisetup');
const Workspace = require('../model/home/workspace/workspace')
const Event = require('../model/home/reminder/event')
const Board = require('../model/home/workspace/kanbanboard')
const Reminder = require('../model/home/reminder/Reminder')
const Joi = require('joi');
const path = require('path');
const { json } = require('body-parser');
const ImageUpload = require('../model/home/upload/upload')
const VideoUpload = require('../model/home/upload/videoupload')
const User = require('../model/auth/user')
const Folder = require('../model/auth/folder')
const {storage} = require('../cloudinary/index')
const  OpenAI = require("openai");

const upload = multer({storage})

const openai = new OpenAI({
	apiKey: "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",
});

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
  


function getRandomColor() {
    const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

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

Router.post('/event/:id',async(req,res)=>{
  try {
    console.log('put')
    const taskId = req.params.id;
    let newPosition = req.body.newPosition;
    console.log('task id' +taskId)
    if (!taskId || !newPosition) {
      return res.status(400).json({ error: 'Missing required parameters: taskId and newPosition' });
    }
   
    // Find the task by its ID and update its position
    const updatedEvent = await Event.findByIdAndUpdate(taskId, { position: newPosition }, { new: true });
   
   console.log(updatedEvent)
    res.json({ message: 'Task position updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating task position' });
  }
})
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


// Router.post('/quizcard/:id/edit', upload.array('image'), isLoggedIn, catchAsync(async (req, res) => {
//   const { id } = req.params;

//   const { title, description, tags, cards } = req.body;
//   const tagArray = tags.split(',').map((tag) => tag.trim());
//   const cardArray = cards.map((card) => ({
//     term: card.term,
//     position: card.position,
//     definition: card.definition,
//   }));

//   let updatedData = {
//     title,
//     description,
//     tags: tagArray,
//     cards: cardArray,
//   };

//   if (req.files && req.files.length > 0) {
//     const uploadedFiles = req.files;
//     const imageUrls = uploadedFiles.map((file) => `${file.filename}`);

//     updatedData.imageUrl = imageUrls[0]; // Assuming only one image is uploaded for now
//   }

//   const quizCard = await QuizCard.findByIdAndUpdate(id, updatedData, { new: true });

//   req.flash('success', 'Successfully updated quiz card!');
//   res.redirect(`/home/quiz/${quizCard._id}`);
// }));

Router.post('/quizcard/:id/edit',  upload.array('image'), isLoggedIn, catchAsync(async (req, res) => {
  console.log(req.body)

  const { id } = req.params;

  try {
    // const { error, value } = quizCardSchema.validate(req.body);

    // if (error) {
    //   // Handle validation error
    //   req.flash('error', error.details[0].message);
    //   return res.send(error.details[0].message);
    // }
    
    let { title, description, visability, tags, cards,category, orniginalimg,headtingimg} = req.body;

    // Create an array of tag objects with color property
    const tagArray = tags.split(',').map((tag) => ({
      name: tag.trim(),
      color: getRandomColor(),
    }));

    // Check if the cards field is an array
    if (!Array.isArray(cards)) {
      req.flash('error', 'Cards must be an array');
      return res.status(400).send('Cards must be an array');
    }

    const user = req.user;
    console.log(req.files)
    // Create an array of card objects
    const validCards = cards.filter(card => card && card.term && card.definition);
     console.log(req.files)
    const cardArray = validCards.map((card) => {
      const uploadedFile = req.files.find((file) => file.originalname === card.image);
      const imageUrl = uploadedFile ? `${uploadedFile.path}` : '';

    return {
      term: card.term,
      position: card.position,
      imageUrl: imageUrl,
      image: uploadedFile ? uploadedFile.path : card.image, // Store only the filename
      definition: card.definition,
    };
    });
    if(orniginalimg === '' || orniginalimg === undefined){ 
      orniginalimg = 'quizcard.jpg'
    }
    const imageUrls = req.files.map((file) => `${file.path}` );
    const imageur = imageUrls[0] ? imageUrls[0] : headtingimg;
    // Create a new QuizCard object
    const updatedData = {
      title,
      description,
      tags: tagArray,
      cards: cardArray,
      category:category,
      author: user._id,
      visability,
      imageUrl:imageur,
    };

      const quizCard = await QuizCard.findByIdAndUpdate(id, updatedData, { new: true });

    res.send({quizCard});
  } catch (e) {
    req.flash('error', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
}));
Router.post('/quizcard/:id/save', catchAsync(async (req, res) => {
    try {
      const { id } = req.params;
      const Quizfound = await QuizCard.findById(id);
      const user = req.user;
  
      if (user.saves.includes(Quizfound._id)) {
        Quizfound.saves.pull(user._id);
        user.saves.pull(Quizfound);
        await user.save();
        await Quizfound.save();
        res.json({ success: true, message: 'Successfully unsaved quiz card!' });
      } else {
        Quizfound.saves.push(user._id);
        user.saves.push(Quizfound);
  
        await user.save();
        await Quizfound.save();
     
      }
    } catch (e) {
      req.flash('error', e.message);
      res.status(500).json({ success: false, message: e.message });
    }
}));

Router.post('/newtask', upload.single('image'), catchAsync(async (req, res) => {
  try {
    const { title, description, image, time, startdate, priority, enddate } = req.body;
    const user = req.user;
    let reminder;
    const imageurl = req.file ? `${req.file.path}` : '';

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



  
//workspace/boards
Router.post('/workspace',upload.single('image'),catchAsync(async(req,res)=>{
  try{
   const user = req.user;
const {title,description,type,img} = req.body;
const newWorkspace = new Workspace({
  title,
    description,
    type,
    tags: ['tag1', 'tag2', 'tag3'],
    image:img,
    
    imageurl: `${req.file.filename}`,
})

  user.Workspace.push(newWorkspace);
  await user.save();
await newWorkspace.save();
res.redirect(`/home/workspace/${newWorkspace._id}`)
  }catch(e){
    req.flash('error',e.message);
    res.json(e.message)
  }


}))

Router.post('/newboard/:id',upload.single('image'),catchAsync(async(req,res)=>{
  try{
 
    const {id} = req.params;
const {title,type,img} = req.body;
const user = req.user;
const workspace = await Workspace.findById(id);

const newBoard = new Board({
  title,
    type,
    bgimage:img,
    imageurl: `${req.file.path}`,
})
await newBoard.save();
workspace.kanbanboard.push(newBoard._id);

await workspace.save();
console.log(workspace)

console.log(Reminder)
res.redirect(`/home/b/${newBoard._id}`)
  }catch(e){
    req.flash('error',e.message);
    res.json(e.message)
  }
}))

Router.post('/tasks/update',catchAsync(async(req,res)=>{
  try{
    console.log(req.body)
  } catch(e){
    req.flash('error',e.message);
    res.json(e.message)
  }
}))

Router.post('/tasks/:id/completed',catchAsync(async(req,res)=>{
  try{
    const {id} = req.params;
    const task = await Event.findById(id);
    task.iscompleted = true;

    await task.save();
    res.json(task)
  } catch(e){
    req.flash('error',e.message);
    res.json(e.message)
  }
}
))

Router.post('/tasks/:id/update',catchAsync(async(req,res)=>{
  try{
    const {id} = req.params;
    const task = await Event.findById(id);
    task.iscompleted = true;
    await task.save();
    res.json(task)
  } catch(e){
    req.flash('error',e.message);
    res.json(e.message)
  }
}
))


Router.post('/board/:id/row', async (req, res) => {
  try {
    const boardId = req.params.id;
    const {  rowTitle } = req.body;

    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    const newRow = {
      title: rowTitle,
      cards: [],
    };

    board.rows.push(newRow);
    await board.save();

    res.status(201).json(newRow);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






Router.post('/api/quizcard/:id/quiz/:quzid', catchAsync(async (req, res) => {
  const { id } = req.params;
  const { quzid } = req.params;
  const user = await User.findById(id);
  const  Quizfound = await QuizCard.findById(quzid);
  console.log(Quizfound)
   res.json({Quizfound});
} ));
Router.get('/api/quizcard/:id/quiz/:quzid', catchAsync(async (req, res) => {
  const { id } = req.params;
  const { quzid } = req.params;
  const user = await User.findById(id);
  const  Quizfound = await QuizCard.findById(quzid);
  console.log(Quizfound)
  res.json({Quizfound});
} ));



//Upload Video


Router.post('/video/upload/new',async(req,res)=>{
  console.log('hi')
  console.log(req.file)
   console.log(req.files)
   const user = req.user
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
        async(err, video) => {

          if (err) return res.send(err);
          console.log(video)

              console.log('Pathh' )
      const videopost = new VideoUpload({
        VideoUrl:video.url,
        title:video.public_id,
        videocreated:video.created_at,
        visibility:'unlisted',
        author: user._id
      })
      await videopost.save()
      user.VideoUpload.push(videopost._id)
      await user.save();

        
      console.log(videopost)
          fs.unlinkSync(path);
          return res.send({video,videopost});
        }
      );

    });

    
})
Router.post('/videoupload', videoupload.fields([
  { name: 'thumbnail', maxCount: 1 }
]), catchAsync(async (req, res) => {
  try {
    const { title, description, category, quizcard,tags, visibility, videoid } = req.body;
    const { thumbnail } = req.files;
    console.log(req.body)
    // Find the video by ID
    const videoToUpdate = await VideoUpload.findById(videoid);
    const quizCard = await QuizCard.findById(quizcard)
    // Update the video properties
    videoToUpdate.title = title;
    videoToUpdate.description = description;
    videoToUpdate.category = category;
    videoToUpdate.tags = tags.split(',').map(tag => tag.trim());
    videoToUpdate.visibility = visibility;
    videoToUpdate.thumbnail = thumbnail.url;
    if(quizcard && quizcard !== 'none'){
    videoToUpdate.quizCard = quizCard._id
    quizCard.video = videoToUpdate._id
    console.log(req.files)
    }
    console.log(videoToUpdate)
    // Save the updated video
    await videoToUpdate.save();
    await quizCard.save()
    

    res.redirect(`/home/video/${videoToUpdate._id}`);
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

    res.redirect(`/home/image/${image._id}`);
  } catch (e) {
    req.flash('error', e.message);
    res.json(e.message);
  }
}));



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

Router.get('/api/videos', (req, res) => {
  const { page, limit } = req.query;
  // Implement the logic to fetch the videos based on the page and limit
  // You can use Mongoose's `skip` and `limit` methods to paginate the results
  // Return the videos as JSON response
});
Router.post('/video/:videoId/comments/:commentId/replies/:replyedId',catchAsync(async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const commentId = req.params.commentId;
    const replyContent = req.body.content;
    const replyedId = req.params.replyedId;


   const replieduser = await User.findById(replyedId);
    const user = req.user;
    const Videoc = await VideoUpload.findById(videoId);

    const comment = Videoc.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    const reply = {
      content: replyContent,
      user: user,
      likes: [],
      dislikes: [],
      targetuser: replieduser,
      replies: []
    };
console.log(reply)
    comment.replies.push(reply);
    console.log(reply)
    
    await comment.save();
    await Videoc.save();
  
    res.json({ comment: comment,foundcomment:comment, reply: reply, user: user ,upload:Videoc});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
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

Router.post('/quiz/:id/combined',async(req,res)=>{
  const cardid = req.params.id.toString(); // Convert to string if necessary
  const  combineid  = req.body.quizid.toString(); // Convert to string if necessary
  console.log(cardid)
  const user = req.user;

  const Cardcombine = await QuizCard.findById(combineid);
  const Currentcard = await QuizCard.findById(cardid);
  
// //combime the Cardcombine to the cardfind
// if(user._id.toString() !== cardfind.author.toString()){
//   return res.status(401).json({ error: 'You do not have permission to do that!' });
// }
console.log(Currentcard.cards)
Cardcombine.cards = Cardcombine.cards.concat(Currentcard.cards); // Combine the arrays

await Cardcombine.save();
res.status(200).json({ Cardcombine });

})


Router.post('/folder/new',async(req,res)=>{
  const {title,visibility} = req.body;
  const user = req.user;
  const folder = new Folder({
    name: title,
    visibility,
  })
  user.folder.push(folder._id);
  folder.user.push(user._id);
  await user.save();
  await folder.save();
  console.log(folder)
  res.status(200).json({folder});
}
)
Router.post('/card/:id/list/:listid',async(req,res)=>{
  const {id} = req.params;
  const {listid} = req.params;
  const user = req.user;
  const card = await QuizCard.findById(id);
  const list = await Folder.findById(listid);
  console.log(list)
  list.cards.push(card._id);
  await list.save();
  res.status(200).json({list});
}
)
  
  

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



// Router.get('/search', async (req, res) => {
//   const searchTerm = req.query.term; // Get the search term from the query string.
  
//   try {
//       const { combinedResults, quizcardResults, videoResults, imageResults } = await searchInData(searchTerm);

//       res.send(combinedResults);
//   } catch (error) {
//       console.error('Error fetching recommendations:', error);
//       res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
//   }
// });

//ai chat
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'give me a story in korean short one' }],
    model: 'gpt-3.5-turbo',
  })

  console.log(completion.choices);
}
let conversation = [
  {
    role: 'system',
    content: 'You will follow the conversation and respond to the queries asked by the \'user\'\'s content. You will act as the assistant'
  }
];
Router.post('/ai/feach', async(req,res)=>{
  const body = req.body
  conversation.push({
    role: 'user',
    content: body.msg
  }) 
  const completion = await openai.chat.completions.create({
    messages: conversation,
    model: 'gpt-3.5-turbo',
  })
 
  const content = completion.choices[0].message.content;
  console.log(content)
  console.log(completion.choices[0]);
  conversation.push({
    role: 'assistant',
    content:content
  })
  res.send({ai:content,name:'ss'})


})
module.exports = Router


