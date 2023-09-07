const express = require('express')
const Router = express.Router()
const multer = require('multer')
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
const translate = require('@iamtraction/google-translate');
const pinyinlite = require('pinyinlite');
const wanakana = require('wanakana');

const upload = multer();

const Video = require('../model/home/upload/videoupload')

Router.post('/upload', (req, res) => {
    console.log(req.body)
    res.send('ok')
})
Router.post('/video/:viddeoId/ceomments/:commentId/replies', (req, res) => {
    try {
    const videoId = req.params.videoId;
    const commentId = req.params.commentId;
    const replyContent = req.body.content;
    const user = req.user;
    const Videoc = VideoUpload.findById(videoId)
    const comment = Videoc.comments.id(commentId)
    const reply = {
        content: replyContent,
        user: user,
        likes: [],
        dislikes: [],
        replies: []
    }
    comment.replies.push(reply)
    Videoc.save()
    console.log(comment)
    res.json({comment: comment, reply: reply})
} catch (error) {
    console.log(error)
    res.json(error)

}

  });

  Router.post('/userprofile', async (req, res) => {
    try {
        const user = req.user;
        const profile = req.body.profile;

        console.log(req.body);

        user.photourl = profile;
        console.log(user);
        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

// Route to handle the like request
Router.post('/video/:videoId/comments/:commentId/like', async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const replyContent = req.body.content;
    let commentId = req.params.commentId;
    const user = req.user;
    let alreadyLiked = false; // Initialize alreadyLiked to false

    const Videoc = await VideoUpload.findById(videoId);

    const comment = Videoc.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.likes.includes(req.user._id)) {
      comment.likes.pull(req.user._id);
      alreadyLiked = true;
    } else {
      comment.likes.push(req.user._id);
      comment.dislikes.pull(req.user._id); // Remove dislike if the user had previously disliked the comment
    }
    await Videoc.save();
    await comment.save();

    let average = comment.likes.length - comment.dislikes.length;

    res.status(200).json({ average: average, likesCount: comment.likes.length, dislikesCount: comment.dislikes.length, alreadyLiked: alreadyLiked });

  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// Route to handle the dislike request
Router.post('/video/:videoId/comments/:commentId/dislike', async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const replyContent = req.body.content;
    let commentId = req.params.commentId;
    const user = req.user;
    let alreadyLiked = false; // Initialize alreadyLiked to false

    const Videoc = await VideoUpload.findById(videoId);

    const comment = Videoc.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.dislikes.includes(req.user._id)) {
      comment.dislikes.pull(req.user._id);
      alreadyLiked = true;
    } else {
      comment.dislikes.push(req.user._id);
      comment.likes.pull(req.user._id); // Remove like if the user had previously liked the comment
    }
    await Videoc.save();
    await comment.save();

    let average = comment.likes.length - comment.dislikes.length;

    res.status(200).json({ average: average, likesCount: comment.likes.length, dislikesCount: comment.dislikes.length, alreadyLiked: alreadyLiked });

  } catch (error) {
    console.log(error);
    res.json(error);
  }
});


Router.post('/video/:videoId/comments/:commentId/:replyId/like', async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const commentId = req.params.commentId;
    const replyId = req.params.replyId;
    const user = req.user;

    // Retrieve the comment and reply from the database
    const video = await VideoUpload.findById(videoId);
    const comment = video.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    const reply = comment.replies.find((r) => r._id.toString() === replyId);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    // Check if the user has already liked the reply
    const alreadyLiked = reply.likes.includes(user._id);
    if (alreadyLiked) {
      // User has already liked the reply, remove the like
      reply.likes.pull(user._id);
    } else {
      // User hasn't liked the reply, add the like
      reply.likes.push(user._id);
      reply.dislikes.pull(user._id); // Remove dislike if the user had previously disliked the reply
    }

    await video.save();

    let average = reply.likes.length - reply.dislikes.length;
    res.status(200).json({ average: average, likesCount: reply.likes.length, dislikesCount: reply.dislikes.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

Router.post('/video/:videoId/comments/:commentId/:replyId/dislike', async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const commentId = req.params.commentId;
    const replyId = req.params.replyId;
    const user = req.user;

    // Retrieve the comment and reply from the database
    const video = await VideoUpload.findById(videoId);
    const comment = video.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    const reply = comment.replies.find((r) => r._id.toString() === replyId);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }

    // Check if the user has already disliked the reply
    const alreadyDisliked = reply.dislikes.includes(user._id);
    if (alreadyDisliked) {
      // User has already disliked the reply, remove the dislike
      reply.dislikes.pull(user._id);
    } else {
      // User hasn't disliked the reply, add the dislike
      reply.dislikes.push(user._id);
      reply.likes.pull(user._id); // Remove like if the user had previously liked the reply
    }

    await video.save();

    let average = reply.likes.length - reply.dislikes.length;
    res.status(200).json({ average: average, likesCount: reply.likes.length, dislikesCount: reply.dislikes.length });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  
//re-replies/edit
Router.post('/video/:videoId/comments/:commentId/replies/:replyId/edit', async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const commentId = req.params.commentId;
    const replyId = req.params.replyId;
    const user = req.user;
    const replyContent = req.body.content;
    const video = await VideoUpload.findById(videoId);
    const comment = video.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    const reply = comment.replies.find((r) => r._id.toString() === replyId);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
  
    reply.content = replyContent;
    await video.save();
    await comment.save();
    await reply.save();
    res.status(200).json({reply: reply});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

Router.post('/video/:videoId/comments/:commentId/replies/:replyId/delete', async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const commentId = req.params.commentId;
    const replyId = req.params.replyId;
    const user = req.user;
    const video = await VideoUpload.findById(videoId);
    const comment = video.comments.find((c) => c._id.toString() === commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    const reply = comment.replies.find((r) => r._id.toString() === replyId);
    if (!reply) {
      return res.status(404).json({ error: 'Reply not found' });
    }
    comment.replies.pull(replyId);
    await video.save();
    await comment.save();
    await reply.remove();
    res.status(200).json({reply: reply});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const testrranslate = async (text, targetLanguage) => {
  try {
    const res = await translate(text, { to: targetLanguage });

    let pinyinSentence = '';

    if (targetLanguage === 'zh-cn') {
      const characters = Array.from(res.text);
      const pinyin = pinyinlite(res.text, { style: pinyinlite.STYLE_NORMAL });
      characters.forEach((character, index) => {
        // Append the character with its corresponding Pinyin to the pinyinSentence
        pinyinSentence += ` ${pinyin[index].join('')} `;
      });
      if(targetLanguage == 'ja')
      {
        const katakanaTranslation = wanakana.toKatakana(kanjiTranslation.text);
        const hiraganaTranslation = wanakana.toHiragana(kanjiTranslation.text);
        return res
      }


      // Trim any leading/trailing whitespace
      pinyinSentence = pinyinSentence.trim().slice(0, -1);
      res.pinyin = pinyinSentence;
    }


    return res;
  } catch (error) {
    console.error('Error translating:', error);
    throw error;
  }
};



Router.post('/api/translate',upload.none(), async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
  
 
    const translatedText =  await testrranslate(text, targetLanguage)

    res.json({ translatedText });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = Router





