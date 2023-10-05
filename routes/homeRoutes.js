const express = require('express')
const Router = express.Router()
const multer = require('multer');
const catchAsync = require('../views/utilities/catchAsync')
const path = require('path');
const Video = require('../model/home/upload/videoupload')
const User = require('../model/auth/user')
const {login,getDistrictUrls } = require('studentvue.js')
const QuizCard = require('../model/home/quizapp/quizcard');
const { use } = require('passport');
const ObjectId = require('mongoose').Types.ObjectId;
const Reminder = require('../model/home/reminder/Reminder')
const Workspace = require('../model/home/workspace/workspace')
const Board = require('../model/home/workspace/kanbanboard')
const Event = require('../model/home/reminder/event')
const VideoUpload = require('../model/home/upload/videoupload')
const ImageUpload = require('../model/home/upload/upload')
const Upload = require('../model/home/upload/upload')
const Folder = require('../model/auth/folder')

const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','You must be signed in')
        return res.redirect('/login')
    }
    next()
}
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/videos');
        },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
        }
    });
const upload = multer({ storage: storage });


Router.get('/',isLoggedIn,catchAsync(async(req,res)=>{
    const route = req.params

    const user = await User.findById(req.user._id).populate({
      path: 'reminder',
      populate: {
        path: 'Event',
        model: 'Event'
      }
    });
   
  
    const Tasks = user.reminder.flatMap(reminder => reminder.Event);
    const recentlyview = []
    for(let viewof of user.recentCard){
        const view = await QuizCard.findById(viewof)
        recentlyview.push(view)
    }

    res.render('content/home/index.ejs',{route,user,Tasks,recentlyview})
}))
Router.get('/board',(req,res)=>{
    res.render('content/home/board.ejs')
})

Router.get('/calendar', isLoggedIn,catchAsync(async(req,res)=>{
    const {id} = req.user
    const user = await User.findById(id)
    const mainuser = await User.findById(user).populate({
        path: 'reminder',
        populate: {
          path: 'Event',
          model: 'Event'
        }
      });
    console.log(mainuser.reminder)
      const Tasks = mainuser.reminder.flatMap(reminder => reminder.Event);
      console.log(Tasks)
    res.render('content/home/calender.ejs', { Tasks, user })
}))
Router.get('/project',isLoggedIn,catchAsync(async(req,res)=>{
    const user = req.user;
    const quizCardIds = user.quizCard.map(id => ObjectId(id)); // Convert the array of strings to ObjectIds
    const userQuizCards = await QuizCard.find({ _id: { $in: quizCardIds } });
    const userWorkspace = await Workspace.find({author: user._id});
    const userFolder = await Folder.find({author: user._id});

    //find videouoload
    const videoUploadIds = user.VideoUpload.map(id => ObjectId(id)); // Convert the array of strings to ObjectIds
    const userVideoUpload = await VideoUpload.find({ _id: { $in: videoUploadIds } });
    //find posts
    const recentlyview = []
    for(let viewof of user.recentCard){
        const view = await QuizCard.findById(viewof)
        recentlyview.push(view)
    }

    const userPosts = await user.Uploads.map(id => ObjectId(id)); // Convert the array of strings to ObjectIds
    const userupload = await Upload.find({ _id: { $in: userPosts } });
    


    res.render('content/home/project.ejs',{user,userQuizCards,userWorkspace,recentlyview,userVideoUpload,userupload,userFolder})
}))
Router.get('/analytics',isLoggedIn,catchAsync(async(req,res)=>{
    const user = req.user;
      //find posts
      const recentlyview = []
    //   for(let viewof of user.recentCard){
    //       const view = await QuizCard.findById(viewof)
    //       recentlyview.push(view)
    //   }  
    const quizCardIds = user.quizCard.map(id => ObjectId(id)); // Convert the array of strings to ObjectIds
    const videoUploadIds = user.VideoUpload.map(id => ObjectId(id)); // Convert the array of strings to ObjectIds
    const userPosts = await user.Uploads.map(id => ObjectId(id)); // Convert the array of strings to ObjectIds

    const userQuizCards = await QuizCard.find({ _id: { $in: quizCardIds } });
    const userVideoUpload = await VideoUpload.find({ _id: { $in: videoUploadIds } });
    const userupload = await Upload.find({ _id: { $in: userPosts } });


    res.render('content/home/analytics.ejs',{user,userQuizCards,recentlyview,userVideoUpload,userupload})

}))

Router.get('/course',(req,res)=>{
    res.render('content/home/course.ejs')
})
Router.get('/blog',(req,res)=>{
    res.render('content/home/blog/index.ejs')
})
Router.get('/discover',async(req,res)=>{
    const card = await QuizCard.find({}).populate('author')
    const video = await VideoUpload.find({}).populate('author')
    const image = await ImageUpload.find({}).populate('author')

    res.render('content/home/discover.ejs', {card,video,image})
})

Router.get('/create/upload',(req,res)=>{
    res.render('content/home/create/upload.ejs')
})
Router.get('/create/board',(req,res)=>{
    res.render('content/home/create/board.ejs')
})


Router.get('/create/folder',(req,res)=>{
    res.render('content/home/create/folder.ejs')
})

Router.get('/profile/:id',catchAsync(async(req,res)=>{
    
    const id = req.params.id
    const user = await User.findById(id).populate('quizCard')
    const videoUploadIds = user.VideoUpload.map(id => ObjectId(id)); // Convert the array of strings to ObjectIds
    const userVideoUpload = await VideoUpload.find({ _id: { $in: videoUploadIds } });

    console.log(userVideoUpload)
    let userQuizCards = []
    res.render('content/home/profile.ejs', { user, userQuizCards,userVideoUpload })
}))
Router.get('/student',async(req,res)=>{
    const DISTRICT_URL = 'https://md-mcps-psv.edupoint.com/';
    const USERNAME = '206840';
    const PASSWORD = 'Wereiflivehe123456';

    try {
        let client = await login(DISTRICT_URL, USERNAME, PASSWORD);
        let attendanceData = await client.getGradebook(2).then((value) => JSON.parse(value));
        console.log(attendanceData)
        res.render('content/home/student.ejs', { attendanceData });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while retrieving attendance data.');
    }
})

Router.get('/create/booklet',isLoggedIn,(req,res)=>{
    res.render('content/home/create/booklet.ejs')
})
Router.get('/test',(req,res)=>{
res.send('hello')
})

//Quiz Routes
Router.get('/quiz/:id',catchAsync(async(req,res)=>{
    
    const {id} = req.params
    const user = req.user;
    const foundquiz = await  QuizCard.findById(id)
    //get all the user quizcard
    const quizowner = await User.findById(foundquiz.author)
    const totalquiz = await QuizCard.find({})
    if(user){
        const quizCardIds = user.quizCard.map(id => ObjectId(id)); // Convert the array of strings to ObjectIds

    const userQuizCards = await QuizCard.find({ _id: { $in: quizCardIds } });

    
    
    await foundquiz.save()
    const folders = await Folder.find({author: user._id})


    if(!req.user.recentCard.includes(foundquiz._id)){
        req.user.recentCard.push(foundquiz)
        await req.user.save()
    }
    await req.user.save()

    res.render('content/home/create/quiz/quizid.ejs',{foundquiz,quizowner,userQuizCards,totalquiz,folders})
}else{

    res.render('content/home/create/quiz/quizid.ejs',{foundquiz,quizowner,totalquiz})

}

}))
Router.get('/quiz/:id/ext',catchAsync(async(req,res)=>{
    
    const {id} = req.params
    console.log(id)
    const foundquiz = await  QuizCard.findById(id)
    foundquiz.viewcount += 1;
    await foundquiz.save()
    const quizowner = await User.findById(foundquiz.author)
    const totalquiz = await QuizCard.find({})

    res.status(200).json({foundquiz,quizowner,totalquiz})

}))
Router.get('/quiz/:id/edit',catchAsync(async(req,res)=>{
    const {id} = req.params
    const user = req.user
    const foundquiz =await QuizCard.findById(id)

    const quizowner = await User.findById(foundquiz.author)
    console.log(user._id,quizowner._id )
    if(user._id.equals(quizowner._id) ){

    res.render('content/home/create/quiz/quizedit.ejs',{foundquiz,quizowner})
    }else{
        return 
    }


}))
Router.get('/quizcard/:id/gubot', catchAsync(async (req, res) => {
    const {id} = req.params
    const foundquiz =await QuizCard.findById(id)
    console.log(foundquiz)

    res.render('content/home/create/quiz/ai.ejs',{foundquiz})
  
    
  }))
Router.get('/quiz/:id/delete',catchAsync(async(req,res)=>{
    const {id} = req.params
    const foundquiz = await QuizCard.findByIdAndDelete(id)
    res.redirect('/home')
}))
Router.get('/quiz/:id/cards',catchAsync(async(req,res)=>{
    const {id} = req.params
    const foundquiz = await QuizCard.findById(id)
    const quizowner = await User.findById(foundquiz.author)
    // foundquiz.plays += 1;
    // await foundquiz.save()

    res.render('content/home/create/quiz/quizcards.ejs',{foundquiz,quizowner})
}))
Router.get('/quiz/:id/match',catchAsync(async(req,res)=>{
    const {id} = req.params
    const foundquiz = await QuizCard.findById(id)
    const quizowner = await User.findById(foundquiz.author)
    // foundquiz.plays += 1;
    // await foundquiz.save()

    res.render('content/home/create/quiz/quizmatch.ejs',{foundquiz,quizowner})
}))
Router.get('/quiz/:id/quiz',catchAsync(async(req,res)=>{
    const {id} = req.params
    const foundquiz = await QuizCard.findById(id)
    const cards = foundquiz.cards
    const quizowner = await User.findById(foundquiz.author)
    // foundquiz.plays += 1;
    // await foundquiz.save()

    res.render('content/home/create/quiz/quiz.ejs',{foundquiz,quizowner,cards})
}))
Router.get('/quizcard/:id/delete',  isLoggedIn,catchAsync(async(req, res) => {
    const { id } = req.params;
    const foundquiz = await QuizCard.findById(id)
    const quizowner = await User.findById(foundquiz.author)
    if(!foundquiz.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/quiz/${id}`);
    }
    await QuizCard.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted quiz');
    await quizowner.quizCard.pull(id)
    await quizowner.save()
    res.redirect(`/home/project`);
}));


//Reminder Routes
Router.get('/reminder',(req,res)=>{
    res.render('content/home/reminder/reminder.ejs')
})
Router.get('/reminder/today',catchAsync(async(req,res)=>{
    const tasks = await Event.find({}).sort({ position: 1 }); // Fetch tasks sorted by position
    const foundreminder = await Reminder.find({});
    const user = await User.findById(req.user._id).populate({
      path: 'reminder',
      populate: {
        path: 'Event',
        model: 'Event'  
      }
    });
  
    const Task = user.reminder.flatMap(reminder => reminder.Event);
    
    res.render('content/home/reminder/today.ejs',{ foundreminder, tasks, Task })
}))
Router.get('/reminder/all', catchAsync(async (req, res) => {
    const tasks = await Event.find({}).sort({ position: 1 }); // Fetch tasks sorted by position
    const foundreminder = await Reminder.find({});
    const user = await User.findById(req.user._id).populate({
      path: 'reminder',
      populate: {
        path: 'Event',
        model: 'Event'
      }
    });
  
    const Task = user.reminder.flatMap(reminder => reminder.Event);
    
  
    res.render('content/home/reminder/all.ejs', { foundreminder, tasks, Task });
}));

Router.get('/reminder/schedule',catchAsync(async(req,res)=>{
    const tasks = await Event.find({})
    const foundreminder = await Reminder.find({})
    res.render('content/home/reminder/scheduled.ejs',{foundreminder, tasks})
}))
    
Router.get('/reminder/completed',catchAsync(async(req,res)=>{
    const tasks = await Event.find({}).sort({ position: 1 }); // Fetch tasks sorted by position
    const foundreminder = await Reminder.find({});
    const user = await User.findById(req.user._id).populate({
      path: 'reminder',
      populate: {
        path: 'Event',
        model: 'Event'
      }
    });
  
    const Task = user.reminder.flatMap(reminder => reminder.Event);
    
    res.render('content/home/reminder/completed.ejs',{foundreminder, tasks, Task})
}))



//Workspace Routes
Router.get('/workspace/:id',catchAsync(async(req,res)=>{
    const { id } = req.params;
    const workspace = await Workspace.findById(id)
    const boardIds = workspace.kanbanboard.map(board => board._id);
    const wpboard = await Board.find({ _id: { $in: boardIds } });
  
    res.render('content/home/workspace/home.ejs', { workspace, wpboard });
}))
Router.get('/b/:id',catchAsync(async(req,res)=>{
    const {id} = req.params

    const wpboard = await Board.findById(id)
    res.render('content/home/workspace/board.ejs',{wpboard})
}))



Router.get('/user/:id/task',catchAsync(async(req,res)=>{
    const {id} = req.params
    const user = await User.findById(id)
    const mainuser = await User.findById(user).populate({
        path: 'reminder',
        populate: {
          path: 'Event',
          model: 'Event'
        }
      });
    
      const Tasks = mainuser.reminder.flatMap(reminder => reminder.Event);
  
    res.render('content/home/user/task.ejs',{mainuser,Tasks})
}
))
Router.get('/user/:id/task',async(req,res)=>{
    const {id} = req.params
    const user = await User.findById(id)
    const mainuser = await User.findById(user).populate({
        path: 'reminder',
        populate: {
          path: 'Event',
          model: 'Event'
        }
      });
    
      const Tasks = mainuser.reminder.flatMap(reminder => reminder.Event);
  
    res.render('content/home/user/task.ejs',{mainuser,Tasks})
}
)

//uploades

Router.get('/video/:id',catchAsync(async(req,res)=>{
    const { id } = req.params;
    const uplaod = await VideoUpload.findById(id).populate({
      path: 'author',
      model: 'User',
    }).populate({
      path: 'comments.user',
      model: 'User',
    }).populate({
        path: 'quizCard',
        model: 'Quizcard',
        });
        console.log(uplaod.quizCard)
    const allvideo = await VideoUpload.find({}).populate('author comments.user');
    uplaod.viewcount += 1;
    console.log(uplaod)

    await uplaod.save();
    
  
    res.render('content/home/upload/watch.ejs', { uplaod, allvideo });
  }));

  Router.get('/video/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const upload = await VideoUpload.findById(id);
    const user = req.user
    const uplaod = await VideoUpload.findById(id).populate({
        path: 'author',
        model: 'User',
      }).populate({
        path: 'comments.user',
        model: 'User',
      }).populate({
          path: 'quizCard',
          model: 'Quizcard',
          });
    // Check if upload exists
    // if (!upload.author._id.equals(req.user._id)) {
    //     req.flash('error', 'You do not have permission to do that!');
    //     return res.redirect(`/video/${id}`);
    //   }
    
    // // Check if the current user is the author of the upload
    // // Make sure upload.author is an array and has at least one element
    // if (!Array.isArray(upload.author) || upload.author.length === 0 || !upload.author[0]._id.equals(req.user._id)) {
    //   req.flash('error', 'You do not have permission to do that!');
    //   return res.redirect(`/video/${id}`);
    // }
    const userobjectquiz = await user.quizCard.map(id => ObjectId(id)); // Convert the array of strings to ObjectIds
    const userQuizCards = await QuizCard.find({ _id: { $in: userobjectquiz } });
    const foundquiz = await QuizCard.findById(id);
    const objectIdString = upload.author[0]._id.toString();

    const quizowner = await User.findById(objectIdString);

    const totalquiz = await QuizCard.find({});
    
    res.render('content/home/upload/edit.ejs', { upload, totalquiz,uplaod, quizowner,userQuizCards });
  }));
  
  
  Router.get('/folder/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const folder = await Folder.findById(id)
        .populate('user')
        .populate({
            path: 'quizCard.cardId',  // Populate the cardId field
            model: 'Quizcard'
        });

    res.render('content/home/Account/folder.ejs', { folder });
}));

  
Router.get('/list/:id',catchAsync(async(req,res)=>{
    const {id} = req.params
    const folder = await Folder.findById(id).populate('author')
    res.render('content/home/Account/list.ejs',{folder})
}))
  
Router.get('/image/:id',catchAsync(async(req,res)=>{
    const {id} = req.params
    const upload = await ImageUpload.findById(id).populate({
        path: 'author',
        model: 'User',
      }).populate({
        path: 'comments.user',
        model: 'User',
      });
      upload.viewcount += 1;

    const allimage = await ImageUpload.find({})

    res.render('content/home/upload/image.ejs',{upload,allimage})
}))


Router.get('/results/search_query/:searchTerm', async (req, res) => {
    const searchTerm = req.params.searchTerm.toLowerCase(); // Use params to get the search term.
    
    try {
        // Search for relevant keywords in your data.
        const { combinedResults, quizcardResults, videoResults, imageResults } = await searchInData(searchTerm);
        
        res.render('content/home/asset/search.ejs', {
            combinedResults,
            searchTerm,
            quizcardResults,
            videoResults,
            imageResults,
        });
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        res.status(500).json({ error: 'Internal Server Error',errorMessage: error.message });
    }
});



async function searchInData(searchTerm) {
    const limit = 30;

    // Perform a search in your data models for relevant keywords in the title field.
    const quizcardResults = await QuizCard.find({
        title: { $regex: searchTerm, $options: 'i' }, // Search in title field.
    }).limit(limit);

    const videoResults = await VideoUpload.find({
        title: { $regex: searchTerm, $options: 'i' }, // Search in title field.
    }).limit(limit);

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


// Inside server.js

Router.get('/get-metric-data/:metric/:startDate/:endDate', async (req, res) => {
    try {
        const { metric, startDate, endDate } = req.params;
        console.log(metric, startDate, endDate)
        const filter = {
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        };

        let field;
        switch (metric) {
            case 'plays':
                field = '$plays';
                break;
            case 'saves':
                field = { $size: '$saves' };
                break;
            case 'viewcount':
                field = '$viewcount';
                break;
            default:
                return res.status(400).json({ error: 'Invalid metric' });
        }

        const data = await QuizCard.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    total: { $sum: 1 } // Use the selected field
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const dates = data.map(item => item._id);
        const values = data.map(item => item.total);

        res.json({ dates, values });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = Router


{/* <div class="flex justify-center align-center content-center">
<div class="card-stack">
    <div class="card-flip active">
        <div class="border  p-3 term rounded card-flips card-front flex justify-center items-center text-center" id="term">
            <span>
                <!-- change the randomIndex ot an randomINdex that comes from the javascript -->
                <span id="next-term" class="nexte-term"></span>   
                <input type="text" id="termid" class="hidden" value="">
                <textarea name="d" id="foundquiz" class="hidden" cols="30" rows="10"><%= JSON.stringify(foundquiz) %></textarea>
            </span>
            <br>
        </div>
    </div>
</div>
</div> */}